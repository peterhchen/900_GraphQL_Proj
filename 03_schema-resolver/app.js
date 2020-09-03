const express = require('express');
const bodyParser = require('body-parser');
// middleware parse for schema and resolver 
const { graphqlHTTP } = require('express-graphql');
// Adding schema. Object destructing
const { buildSchema } = require ('graphql');

const app = express();

app.use(bodyParser.json()); // parse json body
//graphql end point
app.use(
    '/graphql',
    graphqlHTTP({
    // use backtick (``) to write multi-lines of JavaScript 
    // key word query to request/fetch data, mutation for save/delete data.
    // Cannot have comment (\\) inside the multi-lines ``. Very weird compilation error.
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }
        type RootMutation {
            createEvent(name: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: { // resolver are functions based on schema Query
        events: () => {
            return ['Cooking', 'Sailing', 'Coding']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        } 
    },
    graphiql: true      
}));

// app.get('/', (req, res, next) => {
//     res.send('Hello World!');
// })

app.listen(3000); // listen at port 3000. You can use different port
