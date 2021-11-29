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

from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

debug_router = APIRouter(prefix="/debug", tags=["Debug"])


from pydantic import BaseModel, Field


class DebugResponseModel(BaseModel):
    msg: str = Field(default="")

    class Config:
        allow_population_by_field_name = True


@debug_router.get("/500", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
def raise_internal_server_error():
    raise ValueError()


@debug_router.get("/hello-world")
def send_hello_world_msg():
    data = {"msg": "Hello World!"}
    return JSONResponse(content=DebugResponseModel(**data).dict(), status_code=status.HTTP_200_OK)
