#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#

import logging
import threading
from contextlib import contextmanager
from typing import Generator

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
