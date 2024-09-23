from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import Session


sqlite_url = 'sqlite+aiosqlite:///sqlite.db'
db_engine = create_async_engine(sqlite_url, echo=True)


async def get_db_session() -> Session:
    async_session = async_sessionmaker(db_engine, expire_on_commit=False)
    async with async_session() as session:
        async with session.begin():
            yield session
