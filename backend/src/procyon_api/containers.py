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

from dependency_injector import containers, providers, resources

from procyon_api.domain.services import (
    TestService,
    TacticalTechnicalCharacteristicsService,
    ManufacturerService,
)
from procyon_api.infrastructure.dataresources import Database, FileStorage
from procyon_api.infrastructure.repositories import (
    TacticalTechnicalCharacteristicsRepository,
    FileRepository,
    TestEntityRepository,
    AmeEntityRepository,
    DocumentEntityRepository,
    ManufacturerEntityRepository,
)


class DatabaseResource(resources.Resource):
    def init(
        self, username: str, password: str, host: str, port: int, database: str
    ) -> Database:
        db = Database(
            username=username,
            password=password,
            host=host,
            port=port,
            database=database,
        )
        db.connect()
        return db

    def shutdown(self, resource: Database) -> None:
        resource.close()


class FileStorageResource(resources.Resource):
    def init(
        self,
        username: str,
        password: str,
        host: str,
        port: int,
    ) -> FileStorage:
        file_storage = FileStorage(
            username=username,
            password=password,
            host=host,
            port=port,
        )
        file_storage.login()
        return file_storage

    def shutdown(self, resource: FileStorage) -> None:
        resource.logout()


class Datasources(containers.DeclarativeContainer):
    postgres_config = providers.Configuration()
    file_storage_config = providers.Configuration()

    postgres_datasource: providers.Provider[Database] = providers.Resource(
        DatabaseResource,
        postgres_config.user,
        postgres_config.password,
        postgres_config.host,
        postgres_config.port,
        postgres_config.db,
    )

    file_storage_datasource: providers.Provider[FileStorage] = providers.Resource(
        FileStorageResource,
        file_storage_config.user,
        file_storage_config.password,
        file_storage_config.host,
        file_storage_config.port,
    )


class Repositories(containers.DeclarativeContainer):
    datasources = providers.DependenciesContainer()

    test: providers.Singleton[TestEntityRepository] = providers.Singleton(
        TestEntityRepository,
        datasources.postgres_datasource,
    )

    ame: providers.Singleton[AmeEntityRepository] = providers.Singleton(
        AmeEntityRepository,
        datasources.postgres_datasource,
    )

    document: providers.Singleton[DocumentEntityRepository] = providers.Singleton(
        DocumentEntityRepository,
        datasources.postgres_datasource,
    )

    manufacturer: providers.Singleton[
        ManufacturerEntityRepository
    ] = providers.Singleton(
        ManufacturerEntityRepository,
        datasources.postgres_datasource,
    )

    ttc: providers.Singleton[
        TacticalTechnicalCharacteristicsRepository
    ] = providers.Singleton(
        TacticalTechnicalCharacteristicsRepository,
        datasources.postgres_datasource,
    )

    file: providers.Singleton[FileRepository] = providers.Singleton(
        FileRepository,
        datasources.file_storage_datasource,
    )


class Services(containers.DeclarativeContainer):
    repositories = providers.DependenciesContainer()
    config = providers.Configuration()

    test: providers.Factory[TestService] = providers.Factory(
        TestService,
        test_entity_repository=repositories.test,
        ame_entity_repository=repositories.ame,
        document_entity_repository=repositories.document,
        manufacturer_entity_repository=repositories.manufacturer,
    )

    ttc: providers.Factory[TacticalTechnicalCharacteristicsService] = providers.Factory(
        TacticalTechnicalCharacteristicsService,
        ttc_repository=repositories.ttc,
        file_repository=repositories.file,
    )

    manufacturer: providers.Factory[ManufacturerService] = providers.Factory(
        ManufacturerService,
        manufacturer_repository=repositories.manufacturer,
    )


class Application(containers.DeclarativeContainer):
    config = providers.Configuration()
    datasources: providers.Container[Datasources] = providers.Container(
        Datasources,
        postgres_config=config.postgres,
        file_storage_config=config.file_storage,
    )
    repositories: providers.Container[Repositories] = providers.Container(
        Repositories, datasources=datasources
    )
    services: providers.Container[Services] = providers.Container(
        Services, repositories=repositories, config=config
    )
