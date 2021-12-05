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

from procyon_api.domain.dataobjects import (
    TestEntityFilter,
    AmeEntityFilter,
    DocumentEntityFilter,
    ListDataObject,
    ResponseMetaDataObject,
)
from procyon_api.domain.entities import TestCreateEntity, TestUpdateEntity
from procyon_api.domain.exceptions import DocumentNotFoundError
from procyon_api.domain.interfaces.repositories import (
    ITestEntityRepository,
    IAmeEntityRepository,
    IDocumentEntityRepository,
    IManufacturerEntityRepository,
)
from procyon_api.domain.interfaces.services import ITestService
from procyon_api.domain.utils import join_tests_with_ames, join_tests_with_documents


class TestService(ITestService):
    def __init__(
        self,
        test_entity_repository: ITestEntityRepository,
        ame_entity_repository: IAmeEntityRepository,
        document_entity_repository: IDocumentEntityRepository,
        manufacturer_entity_repository: IManufacturerEntityRepository,
    ):
        self._test_entity_repository = test_entity_repository
        self._ame_entity_repository = ame_entity_repository
        self._document_entity_repository = document_entity_repository
        self._manufacturer_entity_repository = manufacturer_entity_repository

    def create(self, test_entity: TestCreateEntity) -> ListDataObject:
        ame_entity = test_entity.get_ame_entity()
        manufacturer_entity = ame_entity.get_manufacturer()
        manufacturer_id = manufacturer_entity.id

        if manufacturer_id is None:
            created_manufacturer = self._manufacturer_entity_repository.add(
                manufacturer_entity
            )[0]
            manufacturer_id = created_manufacturer.id

        created_ame = self._ame_entity_repository.add(ame_entity, manufacturer_id)[0]

        created_test = self._test_entity_repository.add(
            test_entity, {"ame_id": created_ame.id}
        )

        return ListDataObject(resource=created_test)

    def update(self, test_id: int, test_entity: TestUpdateEntity) -> ListDataObject:
        updated_test = [self._test_entity_repository.update(test_id, test_entity)]

        ame_filter = AmeEntityFilter()
        for test in updated_test:
            ame_filter.ids.append(test.ame_id)

        ame_list = self._ame_entity_repository.get_list_by_filter(ame_filter)
        test_with_ame_list = join_tests_with_ames(updated_test, ame_list)

        return ListDataObject(resource=test_with_ame_list)

    def delete(self, test_id: int) -> None:
        self._test_entity_repository.delete(test_id)

    def get_by_filter(self, test_filter: TestEntityFilter) -> ListDataObject:
        test_list = self._test_entity_repository.get_list_by_filter(test_filter)
        total = self._test_entity_repository.get_total_count_by_filter(test_filter)

        return ListDataObject(
            resource=test_list,
            meta=ResponseMetaDataObject(total=total, size=len(test_list)),
        )

    def get_with_ame_by_filter(self, test_filter: TestEntityFilter) -> ListDataObject:
        test_list = self._test_entity_repository.get_list_by_filter(test_filter)
        total = self._test_entity_repository.get_total_count_by_filter(test_filter)

        ame_filter = AmeEntityFilter()
        for test in test_list:
            ame_filter.ids.append(test.ame_id)

        ame_list = self._ame_entity_repository.get_list_by_filter(ame_filter)
        test_with_ame_list = join_tests_with_ames(test_list, ame_list)

        return ListDataObject(
            resource=test_with_ame_list,
            meta=ResponseMetaDataObject(total=total, size=len(test_with_ame_list)),
        )

    def get_with_ame_and_doc_by_filter(
        self, test_filter: TestEntityFilter
    ) -> ListDataObject:
        test_list = self._test_entity_repository.get_list_by_filter(test_filter)
        total = self._test_entity_repository.get_total_count_by_filter(test_filter)

        ame_filter = AmeEntityFilter()
        document_filter = DocumentEntityFilter()

        for test in test_list:
            ame_filter.ids.append(test.ame_id)
            document_filter.test_ids.append(test.id)

        ame_list = self._ame_entity_repository.get_list_by_filter(ame_filter)

        try:
            document_list = self._document_entity_repository.get_list_by_filter(
                document_filter
            )
        except DocumentNotFoundError:
            document_list = []

        test_with_ame_list = join_tests_with_ames(test_list, ame_list)
        test_with_ame_and_doc_list = join_tests_with_documents(
            test_with_ame_list, document_list
        )

        return ListDataObject(
            resource=test_with_ame_and_doc_list,
            meta=ResponseMetaDataObject(
                total=total, size=len(test_with_ame_and_doc_list)
            ),
        )

    def get_by_id(self, test_id: int) -> ListDataObject:
        test_list = self._test_entity_repository.get(test_id)
        total = self._test_entity_repository.get_total_count_by_filter(
            TestEntityFilter(ids=[test_id])
        )

        return ListDataObject(
            resource=[test_list],
            meta=ResponseMetaDataObject(total=total, size=len([test_list])),
        )
