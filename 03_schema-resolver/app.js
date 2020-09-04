const express = require('express');
const bodyParser = require('body-parser'); 
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require ('graphql');

const app = express();
app.use(bodyParser.json()); // parse json body
app.use(
    '/graphql',
    graphqlHTTP({
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
        rootValue: {
            events: () => {
                return ['Cooking', 'Sailing', 'Coding']
            },
            createEvent: (args) => {
                const eventName = args.name;
                return eventName;
            } 
        },
        graphiql: true      
    })
);

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

app.listen(3000); // listen at port 3000. You can use different port
