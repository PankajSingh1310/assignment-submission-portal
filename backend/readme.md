# Assignment Submission Portal Backend

## **Project Overview**
This is a backend web app developed using **Node.js** which provides functionality to the users to submit their assignments.

It also has admin panel in which the admins will be able to accept or reject the assignments submitted by the users.

## **Technologies Used**
**Mongodb :** Mongodb is used for the database

**Node.js** and **Express.js** are used for creating all the APIs.

## **Key Features**
* **User registration and login** with hashed password using *bcrypt* lirary.
* **Admin registration and login** for accepting and rejecting the assignments.
* **JWT token validation** for maintaing the session.
* **cookie-parser** for storing the JWT token.

## **Project Setup**
## Prerequisites
* Node.js
* Express.js
* Mongodb

## Installation
## Steps:
### 1. **Clone repository:**

```
git clone https://github.com/PankajSingh1310/assignment-submission-portal.git
```

### 2. **Install dependencies:**

``` 
npm install 
```
### 3. **Setup environment variable**

* create a .env file in the root directory and paste these variable in this file.
* make sure to change the **MONGO_URI** and **JWT_KEY**.
```
PORT = 3000
MONGO_URI = mongodb://127.0.0.1:27017/<Name of the project>
JWT_KEY = <your secret key here>
```
### 4. **Start the server**
```
npm start
```



