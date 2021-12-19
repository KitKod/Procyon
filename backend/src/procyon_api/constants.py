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

from enum import Enum


PROJECT_NAME = "procyon"
DESCRIPTION = "Test management system."

BASE_API_PREFIX = f"/api/{PROJECT_NAME}"
API_VERSION_1 = "/v1"

API_PREFIX = BASE_API_PREFIX + API_VERSION_1
SWAGGER_DOC_ENDPOINT = "/docs"


class SQLDialect(Enum):
    POSTGRES = "postgresql"
    MSSQL = "mssql"


class DatabaseDriver(Enum):
    PSYCOPG2 = "psycopg2"


class DatabaseDriver(Enum):
    PSYCOPG2 = "psycopg2"


class FileTypes(Enum):
    JOINT_DECISION = "joint_decision"
    SEPARATE_ORDER = "separate_order"
    ORDER = "order"
    PROGRAM = "program"
    METHOD = "method"
    TTC = "ttc"
