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

from dataclasses import dataclass, field
from typing import List, Optional, Union

from procyon_api.domain.entities import (
    TestEntity,
    TestWithAmeEntity,
    TestWithAmeAndDocEntity,
    ManufacturerEntity,
    DocumentEntity,
)


# Response data objects


@dataclass
class ResponseMetaDataObject:
    total: int
    size: int


@dataclass
class ListDataObject:
    resource: List[
        Union[
            TestWithAmeAndDocEntity,
            TestWithAmeEntity,
            TestEntity,
            ManufacturerEntity,
            DocumentEntity,
        ]
    ]
    meta: Optional[ResponseMetaDataObject] = None


# Filters


@dataclass
class TestEntityFilter:
    ids: List[int] = field(default_factory=list)


@dataclass
class AmeEntityFilter:
    ids: List[int] = field(default_factory=list)


@dataclass
class ManufacturerEntityFilter:
    ids: List[int] = field(default_factory=list)


@dataclass
class DocumentEntityFilter:
    ids: List[int] = field(default_factory=list)
    test_ids: List[int] = field(default_factory=list)
