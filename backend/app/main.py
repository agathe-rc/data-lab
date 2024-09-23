from fastapi import FastAPI, logger
from starlette.middleware.cors import CORSMiddleware

from app.projects.router import router as projects_router


app = FastAPI()
version = "v1"

app.include_router(
    projects_router,
    prefix=f"/{version}/projects",
    tags=[version]
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    import uvicorn

    logger.info("Starting uvicorn in reload mode")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        reload=True,
        port=int("8000"),
    )
