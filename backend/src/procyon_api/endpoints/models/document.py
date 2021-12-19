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

from datetime import date
from typing import Optional

from pydantic import BaseModel
from procyon_api.domain.entities import DocumentCreateEntity


# Request models section


class DocumentRequestModel(BaseModel):
    type: str
    status: str
    government: str
    date_of_approval: date
    material_and_technical_means: str
    ame_id: int

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

    def to_domain(
        self, name: str, test_id: Optional[int] = None, file_index: Optional[str] = None
    ):
        return DocumentCreateEntity(
            type=self.type,
            status=self.status,
            government=self.government,
            date_of_approval=self.date_of_approval,
            material_and_technical_means=self.material_and_technical_means,
            ame_id=self.ame_id,
            file_index=file_index,
            test_id=test_id,
            name=name,
        )


# Response models section


class DocumentResponseModel(BaseModel):
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

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
