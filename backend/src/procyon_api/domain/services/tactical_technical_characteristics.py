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

from fastapi import UploadFile

from procyon_api.domain.interfaces.repositories import (
    ITacticalTechnicalCharacteristicsRepository,
)
from procyon_api.domain.interfaces.services import (
    ITacticalTechnicalCharacteristicsService,
)
from procyon_api.domain.entities import TacticalTechnicalCharacteristicsCreateEntity


class TacticalTechnicalCharacteristicsService(ITacticalTechnicalCharacteristicsService):
    def __init__(
        self,
        ttc_repository: ITacticalTechnicalCharacteristicsRepository,
    ):
        self._ttc_repository = ttc_repository

    def upload_to_storage(self, file: UploadFile) -> int:
        ttc_entity = self._ttc_repository.add(
            TacticalTechnicalCharacteristicsCreateEntity(file_index=file.filename)
        )

        return ttc_entity.id
