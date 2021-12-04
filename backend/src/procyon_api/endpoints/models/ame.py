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

from pydantic import BaseModel

from .manufacturer import ManufacturerRequestModel


# Request models section


class AmeRequestModel(BaseModel):
    name: str
    family: str
    type: str
    manufacturer: ManufacturerRequestModel

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


# Response models section


class AmeResponseModel(BaseModel):
    id: int
    name: str
    family: str
    type: str
    manufacturer_id: int
    ttc_id: int

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
