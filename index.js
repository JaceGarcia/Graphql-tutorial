const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')


const db = {
    users: [
        { id: '1', email: 'alex@gmail.com', name: 'Alex'},
        { id: '2', email: 'max@gmail.com', name: 'Max'}
    ]
}

const schema = buildSchema(`
    type Query {
        users: [User!]!
    }

    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
    }
`)

const rootValue = {
    users: () => db.users
}
const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(3000, () => console.log('listening on 3000'))


// const { graphql, buildSchema } = require(`graphql`)



// graphql(
//     schema,
//     `
//         {
//             users {
//                 id
//                 email
//             }
//         }
//     `,
//     rootValue
// ).then(
//     res => console.dir(res, { depth: null})
// ).catch(
//     console.error
// )

