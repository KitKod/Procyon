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

import json

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, status, Form, UploadFile, File

from procyon_api.constants import FileTypes
from procyon_api.containers import Services, Repositories
from procyon_api.domain.dataobjects import DocumentEntityFilter
from procyon_api.domain.entities import FileEntity
from procyon_api.domain.interfaces.repositories import ITestEntityRepository
from procyon_api.domain.interfaces.services import IDocumentService
from procyon_api.endpoints.models import ListResponseModel
from procyon_api.endpoints.models.document import DocumentRequestModel

document_router = APIRouter(prefix="/{test_id}/documents", tags=["Document"])


@document_router.get(
    "/", response_model=ListResponseModel, status_code=status.HTTP_200_OK
)
@inject
def get_documents_list(
    test_id: int,
    document_service: IDocumentService = Depends(Provide[Services.document]),
):
    return document_service.get_by_filter(DocumentEntityFilter(test_ids=[test_id]))


@document_router.post(
    "/", response_model=ListResponseModel, status_code=status.HTTP_200_OK
)
@inject
def create_test(
    test_id: int,
    document: str = Form(...),
    document_file: UploadFile = File(...),
    document_service: IDocumentService = Depends(Provide[Services.document]),
    test_repository: ITestEntityRepository = Depends(Provide[Repositories.test]),
):
    test_name = test_repository.get(test_id).name
    document_to_create = DocumentRequestModel(**json.loads(document)).to_domain(
        name=document_file.filename,
        test_id=test_id,
    )

    file_info = document_service.upload_file_to_storage(
        FileEntity(
            test_name, FileTypes(document_to_create.type), document_file.filename
        ),
        document_file,
    )

    document_to_create.file_index = file_info.make_path()

    return document_service.create_document(document_to_create)
