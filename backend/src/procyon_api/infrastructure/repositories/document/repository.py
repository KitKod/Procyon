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

from typing import List, Optional

from sqlalchemy import select

from procyon_api.domain.dataobjects import DocumentEntityFilter
from procyon_api.domain.entities import DocumentEntity
from procyon_api.domain.exceptions import DocumentNotFoundError
from procyon_api.domain.interfaces.repositories import IDocumentEntityRepository
from procyon_api.infrastructure import Database
from procyon_api.infrastructure.orm_models import document_table
from .mappers import make_document_entities


class DocumentEntityRepository(IDocumentEntityRepository):
    def __init__(self, database: Database) -> None:
        self.db = database

    @property
    def get_query(self):
        return select(
            [
                document_table.c.id.label("document_id"),
                document_table.c.name.label("document_name"),
                document_table.c.type.label("document_type"),
                document_table.c.status.label("document_status"),
                document_table.c.government.label("document_government"),
                document_table.c.date_of_approval.label("document_date_of_approval"),
                document_table.c.material_and_technical_means.label(
                    "document_material_and_technical_means"
                ),
                document_table.c.file_index.label("document_file_index"),
                document_table.c.ame_id.label("document_ame_id"),
                document_table.c.test_id.label("document_test_id"),
            ],
        ).select_from(document_table)

    def get_list_by_test_id(self, test_id: int) -> List[DocumentEntity]:
        query = self.get_query.where(document_table.c.test_id == test_id)

        with self.db.connection() as connection:
            doc_rows = connection.execute(query).fetchall()

        if not doc_rows:
            raise DocumentNotFoundError(
                f"Document for `{test_id}` test_id were not found."
            )

        return make_document_entities(doc_rows)

    def get_list_by_filter(
        self, filter: Optional[DocumentEntityFilter] = None
    ) -> List[DocumentEntity]:
        _filter = filter or DocumentEntityFilter()
        query = self.get_query

        if _filter.ids:
            query = query.where(document_table.c.test_id.in_(_filter.test_ids))

        with self.db.connection() as connection:
            doc_rows = connection.execute(query).fetchall()

        if not doc_rows:
            raise DocumentNotFoundError(
                f"Document according to filter `{filter}` were not found."
            )

        return make_document_entities(doc_rows)
