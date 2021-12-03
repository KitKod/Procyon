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

from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel

from .ame import AmeResponseModel
from .root import MetaResponseModel


class TestResponseModel(BaseModel):
    id: int
    name: str
    ame_id: int
    type: str
    status: str
    date: datetime
    location: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class TestWithAmeResponseModel(BaseModel):
    id: int
    name: str
    ame: AmeResponseModel
    type: str
    status: str
    date: datetime
    location: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class TestListResponseModel(BaseModel):
    resource: List[TestResponseModel]
    meta: Optional[MetaResponseModel] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class TestWithAmeListResponseModel(BaseModel):
    resource: List[TestWithAmeResponseModel]
    meta: Optional[MetaResponseModel] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
