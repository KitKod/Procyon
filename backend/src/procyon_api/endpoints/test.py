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

from fastapi import APIRouter, status

from procyon_api.endpoints.models.test import TestListResponseModel
from procyon_api.domain.entities.utils import gen_test_entities

test_router = APIRouter(prefix="/tests", tags=["Test"])


@test_router.get(
    "/", response_model=TestListResponseModel, status_code=status.HTTP_200_OK
)
def get_test_list():
    return gen_test_entities(20)  # imitate service call
