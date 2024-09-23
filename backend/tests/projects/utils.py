from faker import Faker
from app.projects.schemas import Cohort, PartnerInstitution, ProjectBase

fake = Faker("fr_FR")


def generate_random_cohort() -> Cohort:
    return Cohort(
        patients=fake.random_int(min=100, max=10000),
        average_age=fake.random.randint(18, 90),
    )


def generate_random_partner_institution() -> PartnerInstitution:
    return PartnerInstitution(name=fake.company(), location=fake.city())


def generate_random_project() -> ProjectBase:
    return ProjectBase(
        name=fake.catch_phrase(),
        cohort=generate_random_cohort(),
        partners=[generate_random_partner_institution() for _ in range(2)],
    )
