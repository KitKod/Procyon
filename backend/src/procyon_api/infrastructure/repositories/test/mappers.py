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

from procyon_api.domain.entities import TestEntity


def make_test_entity(raw_obj: Dict) -> TestEntity:
    return TestEntity(
        id=raw_obj["id"],
        name=raw_obj["name"],
        ame_id=raw_obj["ame_id"],
        type=raw_obj["type"],
        status=raw_obj["status"],
        date_of_approval=raw_obj["date_of_approval"],
        location=raw_obj["location"],
    )


def make_test_entities(rows: List[dict]) -> List[TestEntity]:
    return [make_test_entity(row) for row in rows]
