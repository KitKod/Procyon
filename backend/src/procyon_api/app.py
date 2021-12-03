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

import logging
import os

import uvicorn
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from procyon_api import endpoints
from procyon_api.configs import Configs
from procyon_api.constants import (
    PROJECT_NAME,
    API_PREFIX,
    SWAGGER_DOC_ENDPOINT,
    DESCRIPTION,
)
from procyon_api.containers import Application
from procyon_api.domain.exceptions import (
    ProcyonException,
    NotFoundError,
    ForbiddenError,
    AlreadyExistsError,
)
from procyon_api.endpoints.models import ErrorModel

logger = logging.getLogger(__name__)


def init_application() -> Application:
    app = Application()
    app.config.from_pydantic(Configs())
    app.init_resources()
    app.services.wire(packages=(endpoints,))

    return app


def create_application() -> FastAPI:
    app: Application = init_application()

    fastapi_app = FastAPI(
        title=PROJECT_NAME,
        version=app.config.version(),
        docs_url=f"{API_PREFIX}{SWAGGER_DOC_ENDPOINT}",
        description=DESCRIPTION,
        openapi_url=f"{API_PREFIX}/openapi.json",
    )
    fastapi_app.include_router(endpoints.debug_router, prefix=API_PREFIX)
    fastapi_app.include_router(endpoints.test_router, prefix=API_PREFIX)
    fastapi_app.app = app

    configure_error_handlers(fastapi_app)

    return fastapi_app


def configure_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(ProcyonException)
    def bad_request(req: Request, exc: ProcyonException):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=ErrorModel(code=exc.code, message=str(exc)).dict(),
        )

    @app.exception_handler(NotFoundError)
    def not_found(req: Request, exc: NotFoundError):
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content=ErrorModel(code=exc.code, message=str(exc)).dict(),
        )

    @app.exception_handler(AlreadyExistsError)
    def already_exists(req: Request, exc: AlreadyExistsError):
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content=ErrorModel(code=exc.code, message=str(exc)).dict(),
        )

    @app.exception_handler(ForbiddenError)
    def forbidden(req: Request, exc: ForbiddenError):
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content=ErrorModel(code=exc.code, message=str(exc)).dict(),
        )


def run_application():
    options = {
        "host": "0.0.0.0",
        "port": 8000,
        "log_level": "debug",
        "reload": os.getenv("ENV", "prod") == "development",
    }

    uvicorn.run("procyon_api.app:create_application", **options)
