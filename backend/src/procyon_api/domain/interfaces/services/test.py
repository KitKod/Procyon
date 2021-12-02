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

from abc import ABC, abstractmethod
from typing import List

from procyon_api.domain.dataobjects import TestEntityFilter
from procyon_api.domain.dataobjects import TestListDataObject, TestWithAmeListDataObject
from procyon_api.domain.entities import TestEntity


class ITestService(ABC):
    @abstractmethod
    def create_test(self, test_entity: TestEntity) -> TestListDataObject:
        pass

    @abstractmethod
    def delete_test(self, test_id: int) -> bool:
        pass

    @abstractmethod
    def get_tests_by_filter(self, test_filter: TestEntityFilter) -> TestListDataObject:
        pass

    @abstractmethod
    def get_tests_with_ame_by_filter(
        self, test_filter: TestEntityFilter
    ) -> TestWithAmeListDataObject:
        pass

    @abstractmethod
    def get_test_by_id(self, test_id: int) -> TestListDataObject:
        pass

    @abstractmethod
    def get_all_files(self) -> List[str]:
        pass