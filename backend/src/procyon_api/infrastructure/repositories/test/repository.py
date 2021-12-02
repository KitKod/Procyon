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

from typing import List

from sqlalchemy import select, func

from procyon_api.domain.dataobjects import TestEntityFilter
from procyon_api.domain.entities import TestEntity
from procyon_api.domain.exceptions import TestNotFoundError
from procyon_api.domain.interfaces.repositories import ITestEntityRepository
from procyon_api.infrastructure import Database
from procyon_api.infrastructure.orm_models import test_table
from .mappers import make_test_entities


class TestEntityRepository(ITestEntityRepository):
    def __init__(self, database: Database) -> None:
        self.db = database

    @property
    def get_query(self):
        return select(
            [
                test_table.c.id.label("test_id"),
                test_table.c.name.label("test_name"),
                test_table.c.ame_id.label("test_ame_id"),
                test_table.c.type.label("test_type"),
                test_table.c.status.label("test_status"),
                test_table.c.date_of_approval.label("test_date_of_approval"),
                test_table.c.location.label("test_location"),
            ],
        ).select_from(test_table)

    def get(self, id: int) -> List[TestEntity]:
        query = self.get_query.where(test_table.c.id == id)

        with self.db.connection() as connection:
            test_rows = connection.execute(query).fetchall()

        if not test_rows:
            raise TestNotFoundError(f"Test with id `{id}` was not found.")

        return make_test_entities(test_rows)

    def get_all_by_filter(self, filter: TestEntityFilter) -> List[TestEntity]:
        _filter = filter or TestEntityFilter()
        query = self.get_query

        if _filter.ids:
            query = query.where(test_table.c.id.in_(_filter.ids))

        with self.db.connection() as connection:
            test_rows = connection.execute(query).fetchall()

        if not test_rows:
            raise TestNotFoundError(f"Tests by filter `{filter}` were not found.")

        return make_test_entities(test_rows)

    def get_total_count_by_filter(self, filter: TestEntityFilter) -> int:
        _filter = filter or TestEntityFilter()
        query = select([func.count()]).select_from(test_table)

        if _filter.ids:
            query = query.where(test_table.c.id.in_(_filter.ids))

        with self.db.connection() as connection:
            result = connection.execute(query).fetchone()

        if result is None:
            return 0

        return result[0]

    def add(self, entity: TestEntity) -> TestEntity:
        pass

    def delete(self, id: int) -> bool:
        pass

    def update(self, entity: TestEntity) -> TestEntity:
        pass
