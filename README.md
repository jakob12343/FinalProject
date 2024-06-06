# SurveySway

SurveySway is a comprehensive platform for creating, managing, and analyzing surveys. This project aims to address the challenges of constructing effective and reliable surveys by providing a robust system that focuses on user experience and data analysis.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

### Objective

The main objective of SurveySway is to provide an efficient and reliable way to create and manage surveys, ensuring a high-quality user experience and accurate data analysis.

### Key Goals

- Efficient survey creation and management.
- Accurate data analysis and reporting.
- User-friendly interface.
- Secure and scalable architecture.

## Features

### Front-end (Client)

- **Login & Registration:**
  - User login with username and password.
  - Registration with required (username, password, birthdate, phone, email) and optional (gender, religion, address, marital status, country of origin) fields.
  - Guest login option.

- **Dashboard:**
  - Option to create new surveys.
  - Display active and inactive surveys.
  - View generic user data.
  - Survey recommendations based on user activity or popularity.
  - Search for surveys.

- **Survey Creation:**
  - Required fields: category, survey name, question, answers (at least 2), duration, visibility (public/private).
  - Optional fields: target audience, survey purpose, registered user requirement.

- **Survey Management:**
  - View detailed and generic survey data.
  - Extend or pause surveys.
  - View user statistics and edit profile.

### Back-end (Server)

- **User Management:**
  - Register new users with validation and token generation.
  - Login with username and password validation.
  - Update user details with token validation.

- **Survey Management:**
  - Create, update, and delete surveys.
  - Real-time survey data retrieval.

### Back-end (Database)

- **Database:** MongoDB
  - Flexible schema model to store diverse survey responses and user demographics.
  - Efficient data retrieval and integrity maintenance.

## Tech Stack

- **Front-end:**
  - React
  - Axios
  - React Bootstrap

- **Back-end:**
  - Node.js
  - Express
  - Mongoose
  - Fs

- **Database:**
  - MongoDB

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/SurveySway.git
   cd SurveySway
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Ensure MongoDB is running.
   - Configure database connection in `config.js`.

4. Start the application:

   ```bash
   npm start
   ```

## Usage

- Register or log in as a user.
- Navigate through the dashboard to create and manage surveys.
- View survey data and analytics.

## API Endpoints

### User

- **POST /Register:** Register a new user.
- **POST /SignIn:** Sign in an existing user.
- **POST /GetguestToken:** Get a token for guest access.
- **POST /GetNewToken:** Refresh user token.
- **GET /Login:** Log in a user.
- **GET /PullUserDetails:** Retrieve user details.
- **GET /ForgotPassword:** Password recovery.
- **GET /PullUserSurveys:** Retrieve user's active surveys.
- **GET /PullOldUserSurveys:** Retrieve user's inactive surveys.
- **GET /PullAllSurveys:** Retrieve all surveys.
- **PUT /UpdateUserDetails:** Update user details.
- **PUT /EditPasword:** Edit user password.
- **DELETE /DeletTargetSurvey:** Delete a specific survey.

### Survey

- **POST /PublishSuervey:** Create a new survey.
- **POST /GetSurveys:** Retrieve surveys based on criteria.
- **PUT /Vote:** Submit a vote for a survey.

## Database Schema

### User

```json
{
  "username": { "type": "String", "required": true, "unique": true },
  "password": { "type": "String", "required": true },
  "email": { "type": "String", "required": true },
  "birthDate": { "type": "String", "required": true },
  "phone": { "type": "String", "required": true },
  "gender": "String",
  "religion": "String",
  "address": "String",
  "maritalStatus": "String",
  "countryOfOrigin": "String"
}
```

### Survey

```json
{
  "author": { "type": "mongoose.Schema.Types.ObjectId", "ref": "User" },
  "authorUsername": "String",
  "title": { "type": "String", "required": true },
  "category": { "type": "String", "required": true },
  "questions": [
    {
      "text": { "type": "String", "required": true },
      "options": [{ "type": "String", "required": true }]
    }
  ],
  "duration": { "type": "Date", "required": true },
  "isPublic": { "type": "Boolean", "required": true },
  "targetAudience": [{ "type": "String" }],
  "purpose": "String",
  "responses": [
    {
      "user": { "type": "mongoose.Schema.Types.ObjectId", "ref": "User" },
      "option": { "type": "Number" }
    }
  ]
}
```

## Future Enhancements

- Friends feature.
- AI-based data analysis.
- Premium subscription options.
- Sponsored surveys with tags.
- Additional features as needed.


## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

This README file provides an extensive overview of your project, covering all essential details for setup, usage, and contribution.
