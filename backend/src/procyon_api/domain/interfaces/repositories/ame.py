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
from typing import List, Optional

from procyon_api.domain.dataobjects import AmeEntityFilter
from procyon_api.domain.entities import AmeEntity, AmeCreateEntity


class IAmeEntityRepository(ABC):
    @abstractmethod
    def get_list_by_filter(
        self, filter: Optional[AmeEntityFilter] = None
    ) -> List[AmeEntity]:
        pass

    @abstractmethod
    def add(self, entity: AmeCreateEntity, manufacturer_id: int) -> List[AmeEntity]:
        pass

    @abstractmethod
    def delete(self, id: int) -> bool:
        pass

    @abstractmethod
    def update(self, entity: AmeEntity) -> AmeEntity:
        pass

    @abstractmethod
    def get_total_count_by_filter(
        self, filter: Optional[AmeEntityFilter] = None
    ) -> int:
        pass
