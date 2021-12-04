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

from typing import List, Dict

from procyon_api.domain.entities import ManufacturerEntity


def make_manufacturer_entity(raw_obj: Dict) -> ManufacturerEntity:
    return ManufacturerEntity(
        id=raw_obj["id"],
        name=raw_obj["name"],
        address=raw_obj["address"],
        chief=raw_obj["chief"],
        contact=raw_obj["contact"],
    )


def make_manufacturer_entities(rows: List[dict]) -> List[ManufacturerEntity]:
    return [make_manufacturer_entity(row) for row in rows]
