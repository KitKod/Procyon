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
from typing import List, Dict, Any

from procyon_api.domain.dataobjects import TestEntityFilter
from procyon_api.domain.entities import TestEntity, TestCreateEntity, TestUpdateEntity


class ITestEntityRepository(ABC):
    @abstractmethod
    def get(self, id: int) -> TestEntity:
        pass

    @abstractmethod
    def get_list_by_filter(self, filter: TestEntityFilter) -> List[TestEntity]:
        pass

    @abstractmethod
    def add(
        self, entity: TestCreateEntity, additional_fields: Dict[str, Any]
    ) -> List[TestEntity]:
        pass

    @abstractmethod
    def delete(self, test_id: int) -> None:
        pass

    @abstractmethod
    def update(self, test_id: int, entity: TestUpdateEntity) -> TestEntity:
        pass

    @abstractmethod
    def get_total_count_by_filter(self, filter: TestEntityFilter) -> int:
        pass
