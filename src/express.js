const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { schema } = require('./schema')

const app = express();
app.use('/graphql', graphqlHTTP({ schema }));
const server = createServer(app);

server.listen(4500, () => {
    new SubscriptionServer(
        {
            execute, subscribe, schema
        },
        {
            server, path: "/graphql"
        }
    );
    console.info('Server running on port 4500')
});
