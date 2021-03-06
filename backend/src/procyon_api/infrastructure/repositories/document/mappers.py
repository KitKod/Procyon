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

from procyon_api.domain.entities import DocumentEntity


def make_document_entity(raw_obj: Dict) -> DocumentEntity:
    return DocumentEntity(
        id=raw_obj["id"],
        name=raw_obj["name"],
        type=raw_obj["type"],
        status=raw_obj["status"],
        government=raw_obj["government"],
        date_of_approval=raw_obj["date_of_approval"],
        material_and_technical_means=raw_obj["material_and_technical_means"],
        file_index=raw_obj["file_index"],
        ame_id=raw_obj["ame_id"],
        test_id=raw_obj["test_id"],
    )


def make_document_entities(rows: List[dict]) -> List[DocumentEntity]:
    return [make_document_entity(row) for row in rows]
