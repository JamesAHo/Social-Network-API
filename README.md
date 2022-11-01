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
- To get all user:        `GET /api/users`
- To create user:        `POST /api/users`
- To get user by id:       `GET /api/users/:id`
- To Update User:        `PUT /api/users/:id`
- To Delete a user:        `DELETE /api/users/:id`
- To Add a friend:         `PUT /api/users/:userId/friends/:friendId`
- To Delete a friend:      `DELETE /api/users/:userId/friends/:friendId`

**Thought**
- To Get all thoughts:     `GET /api/thoughts`
- To Create a thought:     `POST /api/thoughts`
- To Get thought by ID:    `GET /api/thoughts/:id`
- To Update a thought:     `PUT /api/thoughts/:id`
- To Delete a thought:     `DELETE /api/thoughts/:id`

**Reaction**
- To Add a reaction:       `PUT /api/thoughts/:id/reactions`
- To Delete a reaction:    `DELETE /api/thoughts/:id/reactions`

## Technologies
Technologies used for this project are: 
- NodeJS
- Express
- Mongoose
- Moment
- Nodemon

