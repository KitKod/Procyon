import owncloud
import logging
import threading
from contextlib import contextmanager
from typing import Generator, Optional

from sqlalchemy import MetaData, create_engine
from sqlalchemy.engine.base import Connection, Engine
from sqlalchemy.engine.url import URL

from procyon_api.constants import DatabaseDriver, SQLDialect

metadata = MetaData()

logger = logging.getLogger("databases")


class Database:
    def __init__(
        self,
        username: str,
        password: str,
        host: str,
        port: int,
        database: str,
        dialect: DatabaseDriver = SQLDialect.POSTGRES,
        driver: SQLDialect = DatabaseDriver.PSYCOPG2,
        metaflags: dict = None,
    ) -> None:
        self.username = username
        self.password = password
        self.host = host
        self.port = port
        self.database = database
        self.driver_name = f"{dialect.value}+{driver.value}"
        self.metaflags = metaflags if metaflags is not None else {}

        self.engine: Engine = None
        self.engine_url: URL = None

        self._registry = threading.local()

    def get_connection(self) -> Connection:
        if not self.engine:
            raise ValueError("Database isn't configured")

        try:
            connection = self._registry.connection
            if connection is None:
                raise AttributeError()
        except AttributeError:
            logger.debug("Start new database connection")
            connection = self.configure_connection(self.engine.connect())
            self._registry.connection = connection

        return connection

    @contextmanager
    def connection(self) -> Generator[Connection, None, None]:
        connection = self.get_connection()

        transaction = connection.begin()
        try:
            yield connection
            transaction.commit()
        except:  # noqa: E722
            transaction.rollback()
            raise

    def configure_connection(self, connection) -> Connection:
        return connection.execution_options(autocommit=False)

    def connect(self) -> None:
        logger.debug("Initialize database engine")
        self.engine_url = URL(
            drivername=self.driver_name,
            username=self.username,
            password=self.password,
            host=self.host,
            port=self.port,
            database=self.database,
            query=self.metaflags,
        )
        self.engine = create_engine(self.engine_url, convert_unicode=True, pool_size=5)

    def close(self) -> None:
        logger.debug("Close database connection")
        try:
            if self._registry.connection:
                self._registry.connection.close()
                self._registry.connection = None
        except AttributeError:
            pass

    def healthcheck(self):
        with self.connection() as conn:
            conn.execute("select 1;")


class FileStorage:
    def __init__(
        self,
        username: str,
        password: str,
        host: str,
        port: int,
    ) -> None:
        self._client: Optional[owncloud.Client] = None

        self.username = username
        self.password = password
        self.host = host
        self.port = port
        self.storage_url: str = f"http://{self.host}:{self.port}/"

    def login(self) -> None:
        self._client = owncloud.Client(self.storage_url)
        self._client.login(self.username, self.password)

    def logout(self) -> None:
        self._client.logout()
        self._client = None

    def get_client(self) -> owncloud.Client:
        if self._client is None:
            self.login()

        return self._client
