# SocialMedia-API system

## Description
Set up a backend system for social media API using NodeJS/Express/MongoDB.

## Motivation
The purpose of this repository is to build a CRUD system for a social media application. Before any other operations, all of the routes system must be accurately and functionally operate. 

## Usage
1. Set up MongoDB connection, seek  [MongoDB Website](https://docs.mongodb.com/manual/installation/) to learn more about how to set up the MongoDB connection.
3. Install dependencies.
5. Use  [Insomnia](https://insomnia.rest/) to test the REST API endpoints.
## Mock Up
![landing page demo](./mock/Untitled_%20Sep%2013%2C%202022%2010_47%20PM.gif)

## Enpoints for testing
**User**
- Get all users:        `GET /api/users`
- Create a user:        `POST /api/users`
- Get user by ID:       `GET /api/users/:id`
- Update a user:        `PUT /api/users/:id`
- Delete a user:        `DELETE /api/users/:id`
- Add a friend:         `PUT /api/users/:userId/friends/:friendId`
- Delete a friend:      `DELETE /api/users/:userId/friends/:friendId`

**Thought**
- Get all thoughts:     `GET /api/thoughts`
- Create a thought:     `POST /api/thoughts`
- Get thought by ID:    `GET /api/thoughts/:id`
- Update a thought:     `PUT /api/thoughts/:id`
- Delete a thought:     `DELETE /api/thoughts/:id`

**Reaction**
- Add a reaction:       `PUT /api/thoughts/:id/reactions`
- Delete a reaction:    `DELETE /api/thoughts/:id/reactions`

## Technologies
- NodeJS
- Express
- Mongoose
- Moment
- Nodemon

## References
vanessalane. (2020, September 26). social-media-api (1.0.0). Retrieved September 10, 2022, from https://github.com/vanessalane/social-media-api.