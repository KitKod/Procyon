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

from fastapi import UploadFile

from procyon_api.domain.dataobjects import (
    ListDataObject,
    DocumentEntityFilter,
    ResponseMetaDataObject,
)
from procyon_api.domain.entities import FileEntity, DocumentCreateEntity, FileDataObject
from procyon_api.domain.exceptions import CanNotSaveFileError
from procyon_api.domain.exceptions import DocumentNotFoundError
from procyon_api.domain.interfaces.repositories import (
    IDocumentEntityRepository,
    IFileRepository,
)
from procyon_api.domain.interfaces.services import IDocumentService


class DocumentService(IDocumentService):
    def __init__(
        self,
        document_entity_repository: IDocumentEntityRepository,
        file_repository: IFileRepository,
    ):
        self._document_repository = document_entity_repository
        self._file_repository = file_repository

    def get_by_filter(
        self, document_filter: Optional[DocumentEntityFilter]
    ) -> ListDataObject:
        try:
            document_list = self._document_repository.get_list_by_filter(
                document_filter
            )
        except DocumentNotFoundError:
            document_list = []

        total = self._document_repository.get_total_count_by_filter(document_filter)

        return ListDataObject(
            resource=document_list,
            meta=ResponseMetaDataObject(total=total, size=len(document_list)),
        )

    def create_document(self, document_entity: DocumentCreateEntity) -> ListDataObject:
        created_document = self._document_repository.add(document_entity)

        return ListDataObject(resource=created_document)

    def upload_file_to_storage(
        self, file_info: FileEntity, file: UploadFile
    ) -> FileEntity:
        if not self._file_repository.upload_file_content(file_info, file):
            raise CanNotSaveFileError(
                f"Can not save file to storage by path={file_info.make_path()}."
            )

        return file_info

    def download_file_from_storage(self, path: str) -> FileDataObject:
        return self._file_repository.download(path)
