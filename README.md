# WatchRepairService
![Logo](src/images/Clockwise.png)

<!-- ABOUT THE PROJECT -->
## About The Project

The WatchRepairService project offers online watch repair services. The client enters details into a form, selects a master for a specific date and time in the chosen city, and receives confirmation to the specified email. The project consists of both server and client parts. With a known login and password, access to the admin panel is granted, allowing CRUD operations on entities.
Deployed project: [https://clockwise-app.netlify.app/](https://clockwise-app.netlify.app/)

## Technology Stack

- **Server-Side:**
  - Node.js
  - PostgreSQL
  - Express
  - JWT

- **Client-Side:**
  - React

<!-- GETTING STARTED -->
## Local Deployment

The code for the client-side is located in this repository, while the server-side is hosted at [https://github.com/Vasilievkosta/render-clock](https://github.com/Vasilievkosta/render-clock). For local deployment of this project, in addition to all dependencies from the package.json file, you need to have PostgreSQL installed and create a database as in the database.sql file. You also need to register an account on gmail.com to obtain an access code for nodemailer to send emails.

### Server-Side

Clone the repository:
  ```sh
 git clone https://github.com/Vasilievkosta/render-clock.git


  ```
Navigate to the project folder:
  ```sh
 cd render-clock


  ```
Install dependencies:
  ```sh
 yarn install


  ```
Create a '.env' file and specify the required parameters, for example:
  ```sh
PORT=your_port
DB_USER=your_username
DB_PASSWORD=your_dbpassword
DB_HOST=your_host
DB_NAME=your_dbname
DB_PORT=your_dbpassword

ADMIN_EMAIL=your_email
ADMIN_PASSWORD=your_password

TRANSPORTER_EMAIL=your_transpemail
TRANSPORTER_PASSWORD=your_transpassword
  ```
Start the server:
  ```sh
 yarn start


  ```

### Client-Side
Note! The client-side is installed with npm.

Clone the repo:
   ```sh  
   git clone https://github.com/Vasilievkosta/newClock-client.git
   
   
   ```
Navigate to the project folder:
  ```sh
 cd newClock-client


  ```
Install NPM packages:
   ```sh   
   npm install
   
   
   ```
Start
   ```sh
   npm start
   
   
   ```
### Contacts
#### Konstantin
Email: vasilievkosta@gmail.com

