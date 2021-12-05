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

from dataclasses import dataclass, asdict
from datetime import date
from typing import List

from .ame import AmeEntity, AmeCreateEntity
from .document import DocumentEntity


@dataclass
class TestEntity:
    id: int
    name: str
    ame_id: int
    type: str
    status: str
    date_of_approval: date
    location: str


@dataclass
class TestWithAmeEntity:
    id: int
    name: str
    ame: AmeEntity
    type: str
    status: str
    date_of_approval: date
    location: str


@dataclass
class TestWithAmeAndDocEntity:
    id: int
    name: str
    ame: AmeEntity
    type: str
    status: str
    date_of_approval: date
    location: str
    documents: List[DocumentEntity]


@dataclass
class TestCreateEntity:
    name: str
    ame: AmeCreateEntity
    type: str
    status: str
    date_of_approval: date
    location: str

    def to_dict(self):
        test_info = asdict(self)
        test_info.pop("ame")
        return test_info

    def get_ame_entity(self):
        return self.ame
