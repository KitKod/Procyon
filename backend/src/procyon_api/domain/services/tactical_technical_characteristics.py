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
    IFileRepository,
)
from procyon_api.domain.interfaces.services import (
    ITacticalTechnicalCharacteristicsService,
)
from procyon_api.domain.entities import (
    TacticalTechnicalCharacteristicsCreateEntity,
    FileEntity,
)
from procyon_api.constants import FileTypes
from procyon_api.domain.exceptions import CanNotSaveFileError


class TacticalTechnicalCharacteristicsService(ITacticalTechnicalCharacteristicsService):
    def __init__(
        self,
        ttc_repository: ITacticalTechnicalCharacteristicsRepository,
        file_repository: IFileRepository,
    ):
        self._ttc_repository = ttc_repository
        self._file_repository = file_repository

    def upload_file_to_storage(self, test_name: str, file: UploadFile) -> FileEntity:
        file_info = FileEntity(test_name, FileTypes.TTC, file.filename)

        if not self._file_repository.upload_file_content(file_info, file):
            raise CanNotSaveFileError(
                f"Can not save file to storage by path={file_info.make_path()}."
            )

        return file_info

    def save_file_info_to_db(self, file_info: FileEntity) -> int:
        ttc_entity = self._ttc_repository.add(
            TacticalTechnicalCharacteristicsCreateEntity(
                file_index=file_info.make_path()
            )
        )

        return ttc_entity.id
