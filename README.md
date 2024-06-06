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
- [Personal Addendum](#personal-addendum)

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
   git clone https://github.com/jakob12343/SurveySway.git
   cd SurveySway
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database and server:
   - Navigate to the `Server` folder.
   - Use nodemon to run the server and wait to see "Server Running on port 3000" on the console:

     ```bash
     cd Server
     nodemon
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

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Personal Addendum

Thank you for taking the time to explore SurveySway. This project has been a labor of love, combining my passion for creating user-friendly applications with the challenge of solving real-world problems. 

### Behind the Project

Developing SurveySway has been a journey filled with learning, creativity, and collaboration. The primary goal was to create a platform that not only makes survey creation and management easy but also ensures data accuracy and user satisfaction. Every feature has been thoughtfully designed with the end-user in mind, and I'm incredibly proud of what has been achieved.

### Future Aspirations

As you use SurveySway, you may come across ideas or features that you think could enhance the platform. I encourage you to share your thoughts and contribute to its growth. This project is not just about creating a tool; it's about building a community that values feedback and continuous improvement.

### Get in Touch

If you have any questions, suggestions, or just want to connect, feel free to reach out. Your feedback is invaluable, and I'm always eager to hear from fellow developers, users, and enthusiasts.

### Special Thanks

A special thank you to everyone who has supported me throughout this project. From mentors and peers to the open-source community, your guidance and resources have been instrumental in bringing SurveySway to life.

---

Thank you for being a part of this journey. Together, we can make SurveySway a leading platform for survey creation and analysis.

Warm regards,

Jakob

---
