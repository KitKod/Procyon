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

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, status

from procyon_api.containers import Services
from procyon_api.domain.dataobjects import TestEntityFilter
from procyon_api.domain.interfaces.services import ITestService
from procyon_api.endpoints.models.test import TestWithAmeListResponseModel

test_router = APIRouter(prefix="/tests", tags=["Test"])


@test_router.get(
    "/", response_model=TestWithAmeListResponseModel, status_code=status.HTTP_200_OK
)
@inject
def get_test_list(test_service: ITestService = Depends(Provide[Services.test])):
    return test_service.get_tests_with_ame_by_filter(TestEntityFilter())


@test_router.get(
    "/{test_id}",
    response_model=TestWithAmeListResponseModel,
    status_code=status.HTTP_200_OK,
)
@inject
def get_test(
    test_id: int,
    test_service: ITestService = Depends(Provide[Services.test]),
):
    return test_service.get_tests_with_ame_by_filter(TestEntityFilter(ids=[test_id]))
