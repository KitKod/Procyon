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

from sqlalchemy import Column, String, Table, Integer, ForeignKey, DateTime

from procyon_api.infrastructure import metadata

document_table = Table(
    "document",
    metadata,
    Column("id", Integer, nullable=False, unique=True, primary_key=True),
    Column("name", String, nullable=False),
    Column(
        "type",
        String,
        ForeignKey("document_type_fkey", deferrable=False),
        nullable=False,
    ),
    Column(
        "status",
        String,
        ForeignKey("document_status_fkey", deferrable=False),
        nullable=False,
    ),
    Column(
        "government",
        String,
        ForeignKey("document_government_fkey", deferrable=False),
        nullable=False,
    ),
    Column(
        "date_of_approval",
        DateTime(timezone=True),
        nullable=False,
    ),
    Column(
        "material_and_technical_means",
        String,
    ),
    Column(
        "file_index",
        String,
        nullable=False,
    ),
    Column(
        "ame_id",
        Integer,
        ForeignKey("document_ame_fkey", deferrable=False),
    ),
    Column(
        "test_id",
        Integer,
        ForeignKey("document_test_fkey", deferrable=False),
        nullable=False,
    ),
)
