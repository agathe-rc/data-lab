# Lifen - DataLab Case Study
An app for medical research project management

## Built with
- FastAPI
- SQLite & SQLAlchemy
- Docker Compose
- React


## How to use it

### Local development

#### Back-end

Prerequisites : Python 3.12, Docker, Docker-compose

- Clone the repository
- Enter the back-end directory
````
cd data-lab/backend
````
- Create a virtual environment and activate it
````
python -m venv .venv/ && .venv/bin/activate
````
- Run the container and tests. The tests will generate fake data in the database.
````
docker-compose build
docker-compose up -d
docker-compose run api python -m pytest
````


#### Front-end

- Enter the front-end directory
````
cd data-lab/frontend
````
- Install and run the app in the development mode.
````
npm install
npm start
````

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



## To Do

### Global
- [ ] Write unit tests
- [ ] Set environment variables in a file instead of hard-coded variables
- [ ] Set pre-commit linting

### Back-end
- [ ] Create a database manager implementing database connection, session creation 

### Front-end

