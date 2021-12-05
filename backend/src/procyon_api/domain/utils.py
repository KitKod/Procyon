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

import copy
from typing import List

from .entities import (
    TestEntity,
    AmeEntity,
    TestWithAmeEntity,
    TestWithAmeAndDocEntity,
    DocumentEntity,
)


def join_tests_with_ames(
    test_list: List[TestEntity], ame_list: List[AmeEntity]
) -> List[TestWithAmeEntity]:
    ame_id_entity_map = {}
    for ame in ame_list:
        ame_id_entity_map[ame.id] = ame

    test_with_ame_list = []
    for test in test_list:
        ame_entity = ame_id_entity_map[test.ame_id]
        test_with_ame_list.append(
            TestWithAmeEntity(
                id=test.id,
                name=test.name,
                ame=ame_entity,
                type=test.type,
                status=test.status,
                date_of_approval=test.date_of_approval,
                location=test.location,
            )
        )

    return test_with_ame_list


def join_tests_with_documents(
    test_list: List[TestWithAmeEntity], document_list: List[DocumentEntity]
) -> List[TestWithAmeAndDocEntity]:
    test_id_doc_entity_list_map = {}
    for doc in document_list:
        doc_list = test_id_doc_entity_list_map.get(doc.test_id)

        if doc_list is None:
            test_id_doc_entity_list_map[doc.test_id] = [doc]
        else:
            doc_list.append(doc)

    test_with_ame_and_doc_list = []
    for test in test_list:
        doc_list = test_id_doc_entity_list_map.get(test.id, [])
        test_with_ame_and_doc_list.append(
            TestWithAmeAndDocEntity(
                id=test.id,
                name=test.name,
                ame=copy.deepcopy(test.ame),
                type=test.type,
                status=test.status,
                date_of_approval=copy.deepcopy(test.date_of_approval),
                location=test.location,
                documents=doc_list,
            )
        )

    return test_with_ame_and_doc_list
