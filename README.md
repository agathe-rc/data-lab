# Lifen - DataLab Case Study
An app for medical research project management

## 🛠️ Built with
- FastAPI
- SQLite & SQLAlchemy
- Docker Compose
- React


## 🏃 Getting started


### Back-end
Prerequisites: Python 3.12, Docker, Docker-compose

- Clone the repository
- Enter the back-end directory
````
cd data-lab/backend
````
- Create a virtual environment and activate it
````
python -m venv .venv/ && .venv/bin/activate
````
- Run the container and tests. **The tests will generate fake data in the database.**
````
docker-compose build
docker-compose up -d
docker-compose run api python -m pytest
````

### Front-end
Prerequisites: Node v16, 

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


## 🎨 Improvements

### Global
- [ ] Write unit tests and e2e tests
- [ ] Implement error handling
- [ ] Set environment variables in a file instead of hard-coded variables
- [ ] Set pre-commit hooks for code formatting, env variables checking

### Back-end
- [ ] Set unicity constraints in database models
- [ ] Create configuration file to access environment variables
- [ ] Create a database manager implementing database connection, session creation

### Front-end
- [ ] Add TypeScript
- [ ] Extract styling in theme
- [ ] Sort projects from last to first
- [ ] Add field validation in project creation form
- [ ] Create APIClient class with API configuration and methods
- [ ] Add accessibility attributes

### Continuous Integration
- Back-end
    - Run unit tests & service tests
    - Create Docker image with tag and push it to Docker Hub
    - Deploy tag on testing environment
- Front-end
    - Run unit tests & service tests
    - Build
    - Deploy bundle on testing environment
- Run e2e tests