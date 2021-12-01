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

from .test import TestEntity
from ..dataobjects import TestListDataObject, ResponseMetaDataObject

# TODO: remove !
def gen_test_entities(count) -> TestListDataObject:
    tests = [
        TestEntity(
            id=i,
            name=f"Test_{i}",
            ame="placeholder",
            type=f"Type_{i}",
            status="In progress",
            date=datetime.now(),
            location="Kiev",
        )
        for i in range(count)
    ]

    return TestListDataObject(resource=tests, meta=ResponseMetaDataObject(count, count))
