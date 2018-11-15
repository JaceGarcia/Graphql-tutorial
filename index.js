const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const db = {
    users: [
        { id: '1', email: 'alex@gmail.com', name: 'Alex', avatarUrl: 'https://en.gravatar.com/'},
        { id: '2', email: 'max@gmail.com', name: 'Max', avatarUrl: 'https://en.gravatar.com/'}
    ],
    messages: [
        {id: '1', userId: '1', body: 'Hello', createdAt: Date.now()}
        ,
        {id: '2', userId: '2', body: 'Hi', createdAt: Date.now()}
        ,
        {id: '3', userId: '1', body: 'whats up', createdAt: Date.now()}
    ]
}


const schema = buildSchema(`
    type Query {
        users: [User!]!
        user(id: ID!): User
        messages: [Message !]!
    }
    type Mutation {
        addUser(email: String!, name: String): User
    }
    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
        messages: [Message !]!

    }
    type Message {
        id: ID!
        body: String!
        createdAt: String!
    }
`)

const rootValue = {
    users: () => db.users,
    user: args => db.users.find(user => user.id === args.id),
    messages: () => db.messages,
    addUser: ({email, name}) => {
        const user = {
            id: crypto.randomBytes(10).toString('hex'),
            email,
            name
        }

        db.users.push(user)

        return user
    }
}
const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(3000, () => console.log('listening on 3000'))



