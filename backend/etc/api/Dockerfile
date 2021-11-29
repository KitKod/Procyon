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

FROM python:3.9.9-slim

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # dependencies for installing poetry
        curl \
        # dependencies for building python deps
        build-essential \
        libcurl4-openssl-dev libssl-dev

ENV LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/lib" \
    PYTHONUNBUFFERED=1 \
    LC_ALL=C

# Install Poetry
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

WORKDIR /app/

# Copy poetry.lock* in case it doesn't exist in the repo
COPY ./src/requirements/pyproject.toml ./src/requirements/poetry.lock* /app/


RUN pip install pip==21.2.4 && \
    poetry install --no-interaction --no-ansi --no-root

COPY ./src /app

ARG BUILD_HASH=
ARG BUILD_TAG=
ARG BUILD_DATE=

ENV SERVICE_INFO_HASH=$BUILD_HASH
ENV SERVICE_INFO_TAG=$BUILD_TAG
ENV SERVICE_INFO_DATE=$BUILD_DATE

CMD ["python", "-m", "procyon_api", "serve"]
