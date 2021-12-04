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


from sqlalchemy import Column, String, Table, Integer, ForeignKey, Date

from procyon_api.infrastructure import metadata

test_table = Table(
    "test",
    metadata,
    Column("id", Integer, nullable=False, unique=True, primary_key=True),
    Column("name", String, nullable=False),
    Column(
        "ame_id",
        Integer,
        ForeignKey("fk_ame", deferrable=False, ondelete="cascade"),
        nullable=False,
    ),
    Column(
        "type", String, ForeignKey("test_type_fkey", deferrable=False), nullable=False
    ),
    Column(
        "status",
        String,
        ForeignKey("test_status_fkey", deferrable=False),
        nullable=False,
    ),
    Column("date_of_approval", Date, nullable=False),
    Column("location", String, nullable=False),
)
