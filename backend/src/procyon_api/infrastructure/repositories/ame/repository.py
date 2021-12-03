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

from sqlalchemy import select, func

from procyon_api.domain.dataobjects import AmeEntityFilter
from procyon_api.domain.entities import AmeEntity
from procyon_api.domain.exceptions import AmeNotFoundError
from procyon_api.domain.interfaces.repositories import IAmeEntityRepository
from procyon_api.infrastructure import Database
from procyon_api.infrastructure.orm_models import ame_table
from .mappers import make_ame_entities


class AmeEntityRepository(IAmeEntityRepository):
    def __init__(self, database: Database) -> None:
        self.db = database

    @property
    def get_query(self):
        return select(
            [
                ame_table.c.id.label("ame_id"),
                ame_table.c.name.label("ame_name"),
                ame_table.c.family.label("ame_family"),
                ame_table.c.type.label("ame_type"),
                ame_table.c.manufacturer_id.label("ame_manufacturer_id"),
                ame_table.c.ttc_id.label("ame_ttc_id"),
            ],
        ).select_from(ame_table)

    def get_list_by_filter(
        self, filter: Optional[AmeEntityFilter] = None
    ) -> List[AmeEntity]:
        _filter = filter or AmeEntityFilter()
        query = self.get_query

        if _filter.ids:
            query = query.where(ame_table.c.id.in_(_filter.ids))

        with self.db.connection() as connection:
            ame_rows = connection.execute(query).fetchall()

        if not ame_rows:
            raise AmeNotFoundError(
                f"Armaments and military equipments by filter `{filter}` were not found."
            )

        return make_ame_entities(ame_rows)

    def get_total_count_by_filter(
        self, filter: Optional[AmeEntityFilter] = None
    ) -> int:
        _filter = filter or AmeEntityFilter()
        query = select([func.count()]).select_from(ame_table)

        if _filter.ids:
            query = query.where(ame_table.c.id.in_(_filter.ids))

        with self.db.connection() as connection:
            result = connection.execute(query).fetchone()

        if result is None:
            return 0

        return result[0]

    def add(self, entity: AmeEntity) -> AmeEntity:
        pass

    def delete(self, id: int) -> bool:
        pass

    def update(self, entity: AmeEntity) -> AmeEntity:
        pass
