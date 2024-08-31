MERN (Full Stack Neon Starter kit with complete authentication) Submission for Neon Open Source Starter Kit Challenge

*This is a submission for the [Neon Open Source Starter Kit Challenge ](https://dev.to/challenges/neon): Ultimate Starter Kit*

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Purpose of choosing this stack](#purpose-of-choosing-this-stack)
- [Local Setup](#local-setup)
- [Key Features](#key-features)
- [Conclusion](#conclusion)

## Overview

This kit provides a complete implementation of authentication for Next.js apps using Auth.js for authentication and Neon as a serverless relational database. Auth.js is an excellent library for adding authentication to Next.js applications, and Neon is a great choice for a serverless database solution. And I used Prisma as my ORM.

In this project, I’ve implemented authentication using both email and password, as well as OAuth for Google, Facebook, GitHub, and LinkedIn. It also includes features for password reset and user verification after signup.

If you're looking to build a Next.js app, this starter project can help you get started quickly with a serverless database setup.

## Purpose of choosing this stack

I chose this stack because it combines the best of modern web development tools. Next.js is a powerful framework for building React applications with features like server-side rendering and API routes. Using Auth.js makes handling authentication straightforward and secure, which is crucial for any application. Prisma is the rising star when it comes to relational databases.

I decided to use Neon because it’s a serverless relational database, meaning it automatically scales with demand and I don’t have to manage the server. This makes it a great choice for projects where you want to minimize infrastructure management. Neon offers the flexibility and reliability of a traditional relational database like PostgreSQL, but with the ease of a serverless setup.

Throughout this project, I learned a lot about integrating serverless databases like NeonDB with Next.js. I gained experience in implementing secure authentication flows, including OAuth, email and password logins, and handling password resets and user verification. Using Neon, I found that serverless databases can be both scalable and easy to use, making them a great choice for modern web applications.

## Local Setup

1. Clone this repository and you need to have node version >= 21.2.0 installed iun your machine
2. Go into this folder and run the following command.
        ```js
        npm install
        ```
3. Now you need to add these environment variables by creating a .env file in root of your project. 
    ```js
        DATABASE_URL='your-db-url'

        AUTH_SECRET="some-unique-secret-text"
        AUTH_TRUST_HOST=http://localhost:3000

        RESEND_API_KEY=your-resend-api-key
        MAIL_FROM=Name <your-email-address>

        NEXT_PUBLIC_APP_URL=http://localhost:3000

        JWT_ACCOUNT_ACTIVATION=some-unique-random-string
        JWT_FORGET_PASSWORD=some-unique-random-string

        GOOGLE_CLIENT_ID=your-google-client-id
        GOOGLE_CLIENT_SECRET=your-google-client-secret

        FACEBOOK_CLIENT_ID=your-facebook-client-id
        FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

        GITHUB_CLIENT_ID=your-github-client-id
        GITHUB_CLIENT_SECRET=your-github-client-secret

        LINKEDIN_CLIENT_ID=your-linkedin-client-id
        LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
    ```
    - you can get DATABASE_URL from neon db website by navigating to the dashboard and creating a new project and using next js as a project type.
    - you can get RESEND_API_KEY from by signing up to RESEND at Api Keys > Create API Key
    - you can create a GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from [Google Console](https://console.cloud.google.com) by creating a new project. While Setting the Redirect URL(http://localhost:3000/api/auth/callback/google) you need to follow these [Auth.js docs](https://authjs.dev/reference/core/providers/google#resources) for google oauth.
    - you can create a FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET from [Facebook Dev Tools](https://developers.facebook.com/apps) by creating a new project. While Setting the Redirect URL(http://localhost:3000/api/auth/callback/facebook) you need to follow these [Auth.js docs](https://authjs.dev/getting-started/providers/facebook#callback-url) for facebook oauth.
    - you can create a GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET from [Github Dev Tools](https://github.com/settings/developers) by creating a new project. While Setting the Redirect URL(http://localhost:3000/api/auth/callback/github) you need to follow these [Auth.js docs](https://authjs.dev/getting-started/providers/github) for github oauth.
    - you can create a LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET from [Linkedin Dev Tools](https://www.linkedin.com/developers/apps) by creating a new project. While Setting the Redirect URL(http://localhost:3000/api/auth/callback/linkedin) you need to follow these [Auth.js docs](https://authjs.dev/getting-started/providers/linkedin) for linkedin oauth. while creating project in linkedin, you have to create a page for your organisation which is free of cost.

4. You can even use .env.local file to copy the env variables into .env and updating with your values
5. Finally, Run the following command to start the project in dev mode
    ```js
        npm run dev
    ```
  

## Key Features
    1. Users can Signup using email and password (or) Google OAuth (or) Facebook OAUth (or) GitHub OAuth (or) Linkedin OAuth.
    2. Users Who Signed Up needs to verify their accounts
    3. Users can Login Using email and password (or) Google OAuth (or) Facebook OAUth (or) GitHub OAuth (or) Linkedin OAuth.
    4. Users Can Reset Their Password

## Conclusion

This starter kit offers a robust foundation for building full-stack Next.js applications with secure authentication. By combining Next.js, NextAuth, and Neon, the kit leverages modern technologies to create a seamless development experience. It supports various authentication methods, including email/password and OAuth providers, while utilizing Neon’s scalable serverless database for managing relational data efficiently. Whether you're new to these technologies or looking to accelerate your development process, this starter kit provides all the essential features to get your project off the ground quickly and securely.




