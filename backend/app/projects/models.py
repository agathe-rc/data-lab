from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base


Base = declarative_base()
# SQLAlchemy object-relational configuration
# involves the combination of Table, mapper(),
# and class objects to define a mapped class.
# declarative allows all three to be expressed at once within the class declaration


class Cohort(Base):
    __tablename__ = "cohorts"

    id = Column(Integer, primary_key=True, index=True)
    patients = Column(Integer)
    average_age = Column(Integer)
    projects = relationship("Project", back_populates="cohort")


class PartnerInstitution(Base):
    __tablename__ = "partner_institutions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    location = Column(String)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    cohort_id = Column(Integer, ForeignKey("cohorts.id"))
    cohort = relationship("Cohort", back_populates="projects")
    partners = relationship("PartnerInstitution", secondary="project_partnership")


class ProjectPartnership(Base):
    __tablename__ = "project_partnership"

    project_id = Column(Integer, ForeignKey("projects.id"), primary_key=True)
    partner_id = Column(
        Integer, ForeignKey("partner_institutions.id"), primary_key=True
    )
