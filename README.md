# A Stundet Management App

## Preview

- Server hosted on [Heroku](https://student-task.herokuapp.com/api/student)
- Client hoted on [Netlify](https://student-mysql.netlify.app/)

## Built With

- React
- Express
- Node
- Node-MySQL
- Fuse.js
- Axios
- Material UI

## Run Locally

1. Clone the repo.
2. Add a .env file in the backend with your credentials.
  ```
  DBNAME = ''
  PORT = ''
  MYSQL_HOST = ''
  MYSQL_USER = ''
  MYSQL_PASSWORD = ''
  MYSQL_PORT = ''
  MYSQL_DATABASE = ''
  ```
3. Run the Backend
  ```
  cd backend/
  npm install
  npm run dev
  ```

4. Run the frontend.
  ```
  cd frontend/
  yarn add
  yarn start
  ```