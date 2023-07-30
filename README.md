# MeetUpApp API

## Setup

Install dependencies with `npm install`.


Create .env file inside the server folder and copy content from .env.example into .env
fill in the necessary PostgreSQL configuration
(  eg. 
PORT=8080
DB_HOST=localhost
DB_USER=labber
DB_PASSWORD=labber
DB_DATABASE=meetupapp
DB_PORT=5432
)
Go into psql
Create a db ( CREATE DATABASE meetupapp; )
Creat user ( CREATE USER labber WITH ENCRYPTED PASSWORD ‘labber’; )
Granting access to user( GRANT ALL PRIVILEGES ON DATABASE meetupapp TO labber;)

## Run The Server

Running the server normally
```sh
npm start
```

Running the server so it returns an error when saving/deleting for testing the client's error handling capabilities
```sh
npm run error
```

 # MeetUpApp-api
