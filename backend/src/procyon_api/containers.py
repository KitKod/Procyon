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

from procyon_api.domain.services import TestService
from procyon_api.infrastructure.databases import Database
from procyon_api.infrastructure.repositories import (
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


class Datasources(containers.DeclarativeContainer):
    postgres_config = providers.Configuration()

    postgres_datasource: providers.Provider[Database] = providers.Resource(
        DatabaseResource,
        postgres_config.user,
        postgres_config.password,
        postgres_config.host,
        postgres_config.port,
        postgres_config.db,
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


class Application(containers.DeclarativeContainer):
    config = providers.Configuration()
    datasources: providers.Container[Datasources] = providers.Container(
        Datasources, postgres_config=config.postgres
    )
    repositories: providers.Container[Repositories] = providers.Container(
        Repositories, datasources=datasources
    )
    services: providers.Container[Services] = providers.Container(
        Services, repositories=repositories, config=config
    )
