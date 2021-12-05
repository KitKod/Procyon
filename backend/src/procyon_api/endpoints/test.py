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
from fastapi import APIRouter, Depends, status, File, Form, UploadFile

from procyon_api.containers import Services
from procyon_api.domain.dataobjects import TestEntityFilter
from procyon_api.domain.interfaces.services import (
    ITestService,
    ITacticalTechnicalCharacteristicsService,
)
from procyon_api.endpoints.models.test import (
    TestListResponseModel,
    TestWithAmeRequestModel,
    TestUpdateRequestModel,
    TestWithAmeListResponseModel,
    TestWithAmeAndDocListResponseModel,
)

test_router = APIRouter(prefix="/tests", tags=["Test"])


@test_router.get(
    "/", response_model=TestWithAmeListResponseModel, status_code=status.HTTP_200_OK
)
@inject
def get_test_list(test_service: ITestService = Depends(Provide[Services.test])):
    return test_service.get_with_ame_by_filter(TestEntityFilter())


@test_router.get(
    "/{test_id}",
    response_model=TestWithAmeAndDocListResponseModel,
    status_code=status.HTTP_200_OK,
)
@inject
def get_test(
    test_id: int,
    test_service: ITestService = Depends(Provide[Services.test]),
):
    return test_service.get_with_ame_and_doc_by_filter(TestEntityFilter(ids=[test_id]))


@test_router.post(
    "/", response_model=TestListResponseModel, status_code=status.HTTP_200_OK
)
@inject
def create_test(
    test: str = Form(...),
    ttc_file: UploadFile = File(...),
    test_service: ITestService = Depends(Provide[Services.test]),
    ttc_service: ITacticalTechnicalCharacteristicsService = Depends(
        Provide[Services.ttc]
    ),
):
    ttc_id = ttc_service.upload_to_storage(ttc_file)

    test_to_create = TestWithAmeRequestModel(**json.loads(test)).to_domain()
    test_to_create.ame.ttc_id = ttc_id

    return test_service.create(test_to_create)


@test_router.patch(
    "/{test_id}",
    response_model=TestWithAmeListResponseModel,
    status_code=status.HTTP_200_OK,
)
@inject
def update_test(
    test_id: int,
    field_to_update: TestUpdateRequestModel,
    test_service: ITestService = Depends(Provide[Services.test]),
):
    return test_service.update(test_id, field_to_update.to_domain())


@test_router.delete(
    "/{test_id}", response_model=TestListResponseModel, status_code=status.HTTP_200_OK
)
@inject
def delete_test(
    test_id: int,
    test_service: ITestService = Depends(Provide[Services.test]),
):
    test_service.delete(test_id)
    return TestListResponseModel(resource=[])
