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

import os
import tempfile

import owncloud
from fastapi import UploadFile

from procyon_api.domain.entities import FileEntity, FileDataObject
from procyon_api.domain.interfaces.repositories import IFileRepository
from procyon_api.infrastructure import FileStorage


class FileRepository(IFileRepository):
    def __init__(self, storage: FileStorage) -> None:
        self._storage_client = storage.get_client()

    def download(self, path: str) -> FileDataObject:
        file_info = self._storage_client.file_info(path)
        tmp_file = tempfile.NamedTemporaryFile(delete=False)

        self._storage_client.get_file(path, tmp_file.name)

        return FileDataObject(tmp_file, file_info.attributes["{DAV:}getcontenttype"])

    def upload_file_content(self, file_info: FileEntity, file: UploadFile) -> bool:
        full_path = file_info.make_path()

        if not self.create_directory(full_path):
            return False

        return self._storage_client.put_file_contents(full_path, file.file.read())

    def create_directory(self, full_path: str) -> bool:
        dir_path = os.path.dirname(full_path)
        dir_count = len(dir_path.split(os.path.sep)[1:])
        dirs_to_create = []

        for i in range(dir_count):
            dirs_to_create.append(dir_path.rsplit(os.path.sep, i)[0])

        dirs_to_create.reverse()

        for dir in dirs_to_create:
            if not self.is_path_exist(dir):
                status = self._storage_client.mkdir(dir)
                if not status:
                    return False

        return True

    def is_path_exist(self, path: str) -> bool:
        try:
            self._storage_client.file_info(path)
        except owncloud.owncloud.HTTPResponseError as error:
            if error.status_code == 404:
                return False
            else:
                raise

        return True
