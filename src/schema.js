const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = `
    type Message {
        id: Int!
    }

    type Query {
        message(id: Int!): Message
    }

    type Subscription {
        messages: Message!
    }
`

const getIterator = () => {
    let running = true;
    let id = 0;

    const iter = {
        next: () => {
            const genMessage = () => {
                if (running) {
                    const message = { messages: { id: id++ }};
                    console.info('GENERATED MESSAGE', message);
                    return { value: message, done: false };
                }
                return { done: true };
            };
            return new Promise((resolve) => setTimeout(() => resolve(genMessage()), 2000));
        },
        return: () => {
            running = false;
            console.info("ITERATOR CANCELLED");
            return Promise.resolve({ done: true });
        }
    };

    return { [Symbol.asyncIterator]: () => iter };
}

const resolvers = {
    Query: {
        message: (_, args) => ({id: args.id})
    },
    Subscription: {
        messages: {
            subscribe: () => getIterator()
        }
    }
}

const schema = makeExecutableSchema({typeDefs, resolvers});

exports.schema = schema;