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

from typing import Optional

from pydantic import BaseModel, validator


# Request models section


class ManufacturerRequestModel(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    address: Optional[str] = None
    chief: Optional[str] = None
    contact: Optional[str] = None

    @validator("name", "address", "chief", "contact", always=True)
    def check_if_id_present(cls, v, values):
        if "id" in values and values["id"] is None and v is None:
            raise ValueError(
                "You have to set values for 'name', 'address', 'chief', 'contact' if 'id' is not present."
            )
        return v

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


# Response models section
