from fastapi import APIRouter, Depends, status, HTTPException
from typing import List

from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from app.database import get_db_session
from app.projects.models import (
    Project as ProjectModel,
    Cohort as CohortModel,
    PartnerInstitution as PartnerInstitutionModel
)
from app.projects.schemas import (
    Project as ProjectSchema,
    ProjectBase as ProjectBaseSchema
)


router = APIRouter()


@router.get("/", response_model=List[ProjectSchema])
async def get_projects(session: Session = Depends(get_db_session)):
    result = await session.execute(
        select(ProjectModel).options(
            selectinload(ProjectModel.cohort),
            selectinload(ProjectModel.partners)
        )
    )
    return result.scalars().all()


@router.get("/{project_id}", response_model=ProjectSchema)
async def get_project(
    project_id: int,
    session: Session = Depends(get_db_session)
):
    result = await session.execute(
        select(ProjectModel)
        .where(ProjectModel.id == project_id)
        .options(
            selectinload(ProjectModel.cohort),
            selectinload(ProjectModel.partners)
        )
    )
    try:
        return result.scalars().one()
    except NoResultFound as e:
        raise HTTPException(status_code=404, detail="Project not found") from e


@router.post("/", response_model=ProjectSchema)
async def create_project(
    project: ProjectBaseSchema,
    session: Session = Depends(get_db_session)
):
    cohort = CohortModel(
        patients=project.cohort.patients,
        average_age=project.cohort.average_age
    )
    partners = [
        PartnerInstitutionModel(name=partner.name)
        for partner in project.partners
    ]
    row = ProjectModel(
        name=project.name,
        cohort=cohort,
        partners=partners
    )

    session.add(row)
    await session.commit()
    return row


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: int,
    session: Session = Depends(get_db_session)
):
    result = await session.execute(
        select(ProjectModel).where(ProjectModel.id == project_id)
    )
    row = result.scalars().one()
    await session.delete(row)
    await session.commit()
    return
