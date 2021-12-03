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

from procyon_api.domain.entities import AmeEntity


def make_ame_entity(raw_obj: Dict) -> AmeEntity:
    return AmeEntity(
        id=raw_obj["ame_id"],
        name=raw_obj["ame_name"],
        family=raw_obj["ame_family"],
        type=raw_obj["ame_type"],
        manufacturer_id=raw_obj["ame_manufacturer_id"],
        ttc_id=raw_obj["ame_ttc_id"],
    )


def make_ame_entities(rows: List[dict]) -> List[AmeEntity]:
    return [make_ame_entity(row) for row in rows]
