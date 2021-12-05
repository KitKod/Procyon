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

from typing import Optional

from procyon_api.domain.dataobjects import (
    ManufacturerEntityFilter,
    ListDataObject,
    ResponseMetaDataObject,
)
from procyon_api.domain.interfaces.repositories import (
    IManufacturerEntityRepository,
)
from procyon_api.domain.interfaces.services import IManufacturerService


class ManufacturerService(IManufacturerService):
    def __init__(
        self,
        manufacturer_repository: IManufacturerEntityRepository,
    ):
        self._manufacturer_repository = manufacturer_repository

    def get_by_filter(
        self, manufacturer_filter: Optional[ManufacturerEntityFilter] = None
    ) -> ListDataObject:
        manufacturer_list = self._manufacturer_repository.get_list_by_filter(
            manufacturer_filter
        )
        total = self._manufacturer_repository.get_total_count_by_filter(
            manufacturer_filter
        )

        return ListDataObject(
            resource=manufacturer_list,
            meta=ResponseMetaDataObject(total=total, size=len(manufacturer_list)),
        )
