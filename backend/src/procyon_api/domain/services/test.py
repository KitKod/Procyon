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

from typing import List

from procyon_api.domain.dataobjects import (
    TestEntityFilter,
    AmeEntityFilter,
    TestWithAmeListDataObject,
    TestListDataObject,
    ResponseMetaDataObject,
)
from procyon_api.domain.entities import TestEntity
from procyon_api.domain.interfaces.repositories import (
    ITestEntityRepository,
    IAmeEntityRepository,
)
from procyon_api.domain.interfaces.services import ITestService
from procyon_api.domain.utils import join_tests_with_ames


class TestService(ITestService):
    def __init__(
        self,
        test_entity_repository: ITestEntityRepository,
        ame_entity_repository: IAmeEntityRepository,
    ):
        self._test_entity_repository = test_entity_repository
        self._ame_entity_repository = ame_entity_repository

    def create_test(self, test_entity: TestEntity) -> TestEntity:
        pass

    def delete_test(self, test_id: int) -> bool:
        pass

    def get_tests_by_filter(self, test_filter: TestEntityFilter) -> TestListDataObject:
        test_list = self._test_entity_repository.get_list_by_filter(test_filter)
        total = self._test_entity_repository.get_total_count_by_filter(test_filter)

        return TestListDataObject(
            resource=test_list,
            meta=ResponseMetaDataObject(total=total, size=len(test_list)),
        )

    def get_tests_with_ame_by_filter(
        self, test_filter: TestEntityFilter
    ) -> TestWithAmeListDataObject:
        test_list = self._test_entity_repository.get_list_by_filter(test_filter)
        total = self._test_entity_repository.get_total_count_by_filter(test_filter)

        ame_filter = AmeEntityFilter()
        for test in test_list:
            ame_filter.ids.append(test.ame_id)

        ame_list = self._ame_entity_repository.get_list_by_filter(ame_filter)
        test_with_ame_list = join_tests_with_ames(test_list, ame_list)

        return TestWithAmeListDataObject(
            resource=test_with_ame_list,
            meta=ResponseMetaDataObject(total=total, size=len(test_with_ame_list)),
        )

    def get_test_by_id(self, test_id: int) -> TestListDataObject:
        test_list = self._test_entity_repository.get(test_id)
        total = self._test_entity_repository.get_total_count_by_filter(
            TestEntityFilter(ids=[test_id])
        )

        return TestListDataObject(
            resource=test_list,
            meta=ResponseMetaDataObject(total=total, size=len(test_list)),
        )

    def get_all_files(self) -> List[str]:
        pass
