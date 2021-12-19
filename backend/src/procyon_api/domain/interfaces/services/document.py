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
from typing import Optional

from fastapi import UploadFile

from procyon_api.domain.dataobjects import DocumentEntityFilter, ListDataObject
from procyon_api.domain.entities import DocumentCreateEntity, FileEntity


class IDocumentService(ABC):
    @abstractmethod
    def get_by_filter(
        self, document_filter: Optional[DocumentEntityFilter]
    ) -> ListDataObject:
        pass

    @abstractmethod
    def create_document(self, document_entity: DocumentCreateEntity) -> ListDataObject:
        pass

    @abstractmethod
    def upload_file_to_storage(
        self, file_info: FileEntity, file: UploadFile
    ) -> FileEntity:
        pass
