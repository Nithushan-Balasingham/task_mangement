### **Project Title**: Simple Task Management System


# Overview
For task management app, i developed user signup (name, email, password), signin (email, password) and task CRUD operations using ReactJs, ExpressJs, TailwindCSS, PostgreSql , and Sequelize

### **Frontend (React)**:
Used React to build responsive and resusable components with tailwindCss , and used React hook forms validate the fields of User Signup, SignIn and , Task Add/Update


## **Backend (ExpressJs)**: 
Created RestApi using expressjs, used Sequelize to intercat with PostgreSql with along with that used express validator to check valdiation in  datas of task and user


## **Assumptions**: 
  Basic Authentication have been implemented with protected Routes, and each user will have unique task lists.


# Project Setup
### **Frontend (React)**:
  - Get pull from Client Repo.
  - Install the dependencies -> npm i.
  - Create .env and add mentioned.
`REACT_APP_API_URL` = http://localhost:5000



## Backend

1. **Create a Database in PostgreSql**
    - Install PostgreSql.
   - Set up a PostgreSql database in PgAdmin4.
  - Get pull from Server Repo.
   - Install the dependencies -> npm i.


2. **Create a `.env` File add those below delow details project root directory**
  - `DB_HOST`: Hostname of the PostgreSQL server.
  - `DB_USER`: PostgreSQL username.
  - `DB_PASSWORD`: PostgreSQL password.
  - `DB_NAME`: Database name.
  - `DB_PORT`: PostgreSQL server port (default: 5432).
  - `ACCESS_TOKEN_SECRET`: Some random string.



# Challenges

Managing database relationships  between users and tasks was difficult, Addressed this by using Sequelize methods (hasMany, and belongsTo)

Developing responsive uis to mobile screens was difficult addressed those by tailwindcss properties
