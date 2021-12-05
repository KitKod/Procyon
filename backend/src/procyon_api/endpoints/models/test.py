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

from datetime import date
from typing import Optional, List

from pydantic import BaseModel

from procyon_api.domain.entities import (
    TestCreateEntity,
    TestUpdateEntity,
    AmeCreateEntity,
    ManufacturerCreateEntity,
)
from .ame import AmeResponseModel, AmeRequestModel
from .document import DocumentResponseModel
from .root import MetaResponseModel


# Request models section


class TestUpdateRequestModel(BaseModel):
    name: Optional[str] = None
    ame_id: Optional[int] = None
    type: Optional[str] = None
    status: Optional[str] = None
    date_of_approval: Optional[date] = None
    location: Optional[str] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

    def to_domain(self):
        return TestUpdateEntity(
            name=self.name,
            ame_id=self.ame_id,
            type=self.type,
            status=self.status,
            date_of_approval=self.date_of_approval,
            location=self.location,
        )


class TestWithAmeRequestModel(BaseModel):
    name: str
    ame: AmeRequestModel
    type: str
    status: str
    date_of_approval: date
    location: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

    def to_domain(self):
        return TestCreateEntity(
            name=self.name,
            ame=AmeCreateEntity(
                name=self.ame.name,
                family=self.ame.family,
                type=self.ame.type,
                manufacturer=ManufacturerCreateEntity(
                    name=self.ame.manufacturer.name,
                    address=self.ame.manufacturer.address,
                    chief=self.ame.manufacturer.chief,
                    contact=self.ame.manufacturer.contact,
                ),
            ),
            type=self.type,
            status=self.status,
            date_of_approval=self.date_of_approval,
            location=self.location,
        )


# Response models section


class TestResponseModel(BaseModel):
    id: int
    name: str
    ame_id: int
    type: str
    status: str
    date_of_approval: date
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
    date_of_approval: date
    location: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class TestWithAmeAndDocResponseModel(BaseModel):
    id: int
    name: str
    ame: AmeResponseModel
    type: str
    status: str
    date_of_approval: date
    location: str
    documents: List[DocumentResponseModel]

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


# Response list models section


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


class TestWithAmeAndDocListResponseModel(BaseModel):
    resource: List[TestWithAmeAndDocResponseModel]
    meta: Optional[MetaResponseModel] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
