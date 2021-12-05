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

from procyon_api.domain.dataobjects import TestEntityFilter
from procyon_api.domain.dataobjects import ListDataObject
from procyon_api.domain.entities import TestCreateEntity, TestUpdateEntity


class ITestService(ABC):
    @abstractmethod
    def create(self, test_entity: TestCreateEntity) -> ListDataObject:
        pass

    @abstractmethod
    def update(self, test_id: int, test_entity: TestUpdateEntity) -> ListDataObject:
        pass

    @abstractmethod
    def delete(self, test_id: int) -> None:
        pass

    @abstractmethod
    def get_by_filter(self, test_filter: TestEntityFilter) -> ListDataObject:
        pass

    @abstractmethod
    def get_with_ame_by_filter(self, test_filter: TestEntityFilter) -> ListDataObject:
        pass

    @abstractmethod
    def get_with_ame_and_doc_by_filter(
        self, test_filter: TestEntityFilter
    ) -> ListDataObject:
        pass

    @abstractmethod
    def get_by_id(self, test_id: int) -> ListDataObject:
        pass
