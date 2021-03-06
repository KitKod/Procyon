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
from typing import Optional

from .manufacturer import ManufacturerCreateEntity


@dataclass
class AmeEntity:
    id: int
    name: str
    family: str
    type: str
    manufacturer_id: int
    ttc_id: int


@dataclass
class AmeCreateEntity:
    name: str
    family: str
    type: str
    manufacturer: ManufacturerCreateEntity
    ttc_id: Optional[int] = None

    def to_dict(self):
        ame_info = asdict(self)
        ame_info.pop("manufacturer")
        return ame_info

    def get_manufacturer(self):
        return self.manufacturer
