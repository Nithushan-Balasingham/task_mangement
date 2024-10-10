### **Project Title**: Simple Task Management System

### **Overview**:

Build a **task management web application** where users can create, update, and delete tasks. Each task should include a title, description, priority level (low, medium, high), and a due date. The app should allow users to filter tasks by priority and due date. Please read the `README.md` and `Instructions.md` file prior to starting the assessment.

### **Project Requirements**:

The app should be built using the PERN stack and meet the following requirements:

### **Frontend (React)**:

- Use **React** for building the user interface.
- Create a page that lists all tasks, with options to create, update, and delete tasks.
- Add filters to the task list: allow users to filter by **priority** and **due date**.
- Use **React Hooks** and **functional components** where applicable.
- Ensure **form validation** for adding/updating tasks (e.g., required fields should not be empty, and the due date should be in the future).

### **Backend (Node.js + Express.js)**:

- Create a **REST API** using **Node.js** and **Express.js**.
- The API should have the following endpoints:
  - `GET /tasks`: Fetch all tasks.
  - `POST /tasks`: Create a new task.
  - `PUT /tasks/:id`: Update a task by ID.
  - `DELETE /tasks/:id`: Delete a task by ID.
- Ensure **input validation** on the server side (e.g., use middleware like `express-validator`).

### **Database (PostgreSQL)**:

- Design a **PostgreSQL** database schema to store tasks.
  - A **Task** should have at least the following fields:
    - `id` (primary key, auto-increment)
    - `title` (string, required)
    - `description` (text, optional)
    - `priority` (enum: low, medium, high, required)
    - `due_date` (date, required)
  - Use **Knex.js** or **Sequelize** to manage database migrations and queries.

### **Additional Requirements**:

- Implement **error handling** for failed database operations and invalid API requests.
- Ensure the project is **well-structured** and easy to navigate, with separation of concerns between backend, frontend, and database logic.
- Write **documentation** explaining how to set up and run the project (e.g., a `README.md` file).

### **Bonus**:

- Implement **authentication**: Allow users to sign up, log in, and manage their own tasks.
- Add a **search bar** to filter tasks by title.
- Make the app **mobile-responsive** using basic CSS or a UI framework like **Ant Design** or **Material-UI**.
- Deploy the app on a platform like **Heroku** or **Vercel**.

### **Submission Instructions**:

- Upload your project to a public GitHub repository.
- Include a `README.md` file with:
  - A brief overview of your approach and any assumptions you made.
  - Instructions on how to set up and run the application locally.
  - Any challenges you faced and how you addressed them.

### **Evaluation Criteria**:

- **Functionality**: Does the app meet all the required features?
- **Code Quality**: Is the code clean, readable, and well-organized?
- **Database Design**: Is the database schema normalized and efficient?
- **UI/UX**: Is the front end user-friendly and visually appealing?
- **Best Practices**: Are best practices followed (e.g., proper error handling, security considerations, DRY principles)?

### **Timeline**:

- The candidate has **3 days** to complete and submit the project.
