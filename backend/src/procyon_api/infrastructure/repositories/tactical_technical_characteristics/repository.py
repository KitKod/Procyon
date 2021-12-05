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

from sqlalchemy import select, insert, literal_column
from sqlalchemy.exc import IntegrityError

from procyon_api.domain.entities import (
    TacticalTechnicalCharacteristicsCreateEntity,
    TacticalTechnicalCharacteristicsEntity,
)
from procyon_api.domain.exceptions import (
    TacticalTechnicalCharacteristicsNotFoundError,
    TacticalTechnicalCharacteristicsAlreadyExistsError,
)
from procyon_api.domain.interfaces.repositories import (
    ITacticalTechnicalCharacteristicsRepository,
)
from procyon_api.infrastructure import Database
from procyon_api.infrastructure.orm_models import (
    tactical_technical_characteristics_table,
)
from .mappers import (
    make_tactical_technical_characteristics_entities,
    make_tactical_technical_characteristics_entity,
)


class TacticalTechnicalCharacteristicsRepository(
    ITacticalTechnicalCharacteristicsRepository
):
    def __init__(self, database: Database) -> None:
        self.db = database

    @property
    def get_query(self):
        return select(
            [
                tactical_technical_characteristics_table.c.id.label("id"),
                tactical_technical_characteristics_table.c.name.label("file_index"),
            ],
        ).select_from(tactical_technical_characteristics_table)

    def get(self, id: int) -> List[TacticalTechnicalCharacteristicsEntity]:
        query = self.get_query.where(
            tactical_technical_characteristics_table.c.id == id
        )

        with self.db.connection() as connection:
            ttc = connection.execute(query).fetchall()

        if not ttc:
            raise TacticalTechnicalCharacteristicsNotFoundError(
                f"Tactical technical characteristics with id `{id}` was not found."
            )

        return make_tactical_technical_characteristics_entities(ttc)

    def add(
        self, entity: TacticalTechnicalCharacteristicsCreateEntity
    ) -> TacticalTechnicalCharacteristicsEntity:
        ttc_dict = entity.to_dict()
        insert_query = (
            insert(tactical_technical_characteristics_table)
            .values(**ttc_dict)
            .returning(literal_column("*"))
        )

        with self.db.connection() as connection:
            try:
                obj = connection.execute(insert_query).fetchone()
            except IntegrityError:
                raise TacticalTechnicalCharacteristicsAlreadyExistsError(
                    f"Error during inserting tactical technical characteristics `{entity}`"
                )

        return make_tactical_technical_characteristics_entity(obj)

    def delete(self, id: int) -> bool:
        pass

    def update(
        self, entity: TacticalTechnicalCharacteristicsEntity
    ) -> List[TacticalTechnicalCharacteristicsEntity]:
        pass
