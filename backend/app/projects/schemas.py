from typing import List

from pydantic import BaseModel, ConfigDict


class Cohort(BaseModel):
    patients: int
    average_age: int


class PartnerInstitution(BaseModel):
    name: str


class ProjectBase(BaseModel):
    name: str
    cohort: Cohort
    partners: List[PartnerInstitution] = []  # Why List instead of list
    # main_author: Optional[Author] = None could be related to auth


class Project(ProjectBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
