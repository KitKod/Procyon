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

from procyon_api.domain.entities import ManufacturerCreateEntity, ManufacturerEntity
from procyon_api.domain.exceptions import (
    ManufacturerNotFoundError,
    ManufacturerAlreadyExistsError,
)
from procyon_api.domain.interfaces.repositories import IManufacturerEntityRepository
from procyon_api.infrastructure import Database
from procyon_api.infrastructure.orm_models import manufacturer_table
from .mappers import make_manufacturer_entities


class ManufacturerEntityRepository(IManufacturerEntityRepository):
    def __init__(self, database: Database) -> None:
        self.db = database

    @property
    def get_query(self):
        return select(
            [
                manufacturer_table.c.id.label("id"),
                manufacturer_table.c.name.label("name"),
                manufacturer_table.c.address.label("address"),
                manufacturer_table.c.chief.label("chief"),
                manufacturer_table.c.contact.label("contact"),
            ],
        ).select_from(manufacturer_table)

    def get(self, id: int) -> List[ManufacturerEntity]:
        query = self.get_query.where(manufacturer_table.c.id == id)

        with self.db.connection() as connection:
            manufacturer = connection.execute(query).fetchall()

        if not manufacturer:
            raise ManufacturerNotFoundError(
                f"Manufacturer with id `{id}` was not found."
            )

        return make_manufacturer_entities(manufacturer)

    def add(self, entity: ManufacturerCreateEntity) -> List[ManufacturerEntity]:
        manufacturer_dict = entity.to_dict()
        insert_query = (
            insert(manufacturer_table)
            .values(**manufacturer_dict)
            .returning(literal_column("*"))
        )

        with self.db.connection() as connection:
            try:
                obj = connection.execute(insert_query).fetchone()
            except IntegrityError:
                raise ManufacturerAlreadyExistsError(
                    f"Error during inserting manufacturer `{entity}`"
                )

        return make_manufacturer_entities([obj])

    def delete(self, id: int) -> bool:
        pass

    def update(self, entity: ManufacturerEntity) -> List[ManufacturerEntity]:
        pass
