from fastapi.testclient import TestClient
import pytest
import pytest_asyncio

from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import Session

from app.main import app
from app.projects.models import Base, Project, Cohort, PartnerInstitution
from app.projects.schemas import (
    Project as ProjectSchema,
    ProjectBase as ProjectBaseSchema
)

from tests.projects.utils import generate_random_project


sqlite_url = "sqlite+aiosqlite:///sqlite.db"


@pytest_asyncio.fixture(scope="session", autouse="True")
async def db_engine():
    engine = create_async_engine(sqlite_url, echo=True)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        yield engine
    await engine.dispose()


@pytest_asyncio.fixture(scope="function")
async def db_session(db_engine) -> Session:
    async_session = async_sessionmaker(db_engine, expire_on_commit=False)
    async with async_session() as session:
        async with session.begin():
            yield session


@pytest_asyncio.fixture(scope="function", autouse=True)
async def insert_dummy_data(db_session):
    dummy_projects = [generate_random_project() for _ in range(10)]
    model_objects = [
        Project(
            name=project.name,
            cohort=Cohort(**project.cohort.model_dump()),
            partners=[
                PartnerInstitution(**partner.model_dump())
                for partner in project.partners
            ]
        )
        for project in dummy_projects
    ]

    db_session.add_all(model_objects)
    await db_session.commit()
    await db_session.close()


@pytest.mark.asyncio
async def test_get_all_projects():
    with TestClient(app=app, base_url="http://test") as client:
        response = client.get("/v1/projects/")
        assert response.status_code == 200
        assert len(response.json()) == 10
        assert [ProjectSchema(**project) for project in response.json()]


@pytest.mark.asyncio
async def test_get_project():
    with TestClient(app=app, base_url="http://test") as client:
        response = client.get("/v1/projects/3/")
        assert response.status_code == 200
        assert response.json()["id"] == 3


@pytest.mark.asyncio
async def test_create_project():
    with TestClient(app=app, base_url="http://test") as client:
        project = generate_random_project()
        response = client.post("/v1/projects/", json=project.model_dump())
        assert response.status_code == 200
        assert project == ProjectBaseSchema(**response.json())


@pytest.mark.asyncio
async def test_delete_project():
    with TestClient(app=app, base_url="http://test") as client:
        response = client.delete("/v1/projects/3/")
        assert response.status_code == 204
        response = client.get("/v1/projects/3/")
        assert response.status_code == 404
