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

import os
from dataclasses import dataclass, asdict
from datetime import date
from typing import Optional

from procyon_api.constants import FileTypes


@dataclass
class DocumentEntity:
    """The entity reflects a logical view of file on disk."""

    id: int
    name: str
    type: str
    status: str
    government: str
    date_of_approval: date
    material_and_technical_means: str
    file_index: str
    ame_id: int
    test_id: int


@dataclass
class DocumentCreateEntity:
    type: str
    status: str
    government: str
    date_of_approval: date
    material_and_technical_means: str
    ame_id: int
    name: str
    file_index: Optional[str] = None
    test_id: Optional[int] = None

    def to_dict(self):
        return asdict(self)


@dataclass
class FileEntity:
    """The entity reflects a physical file on disk."""

    test_name: str
    type: FileTypes
    name: str
    root_path: str = "/"

    def make_path(self) -> str:
        path = os.path.join(self.root_path, self.test_name)

        if self.type == FileTypes.METHOD:
            path = os.path.join(path, FileTypes.PROGRAM.value, FileTypes.METHOD.value)
        else:
            path = os.path.join(path, self.type.value)

        return os.path.join(path, self.name)
