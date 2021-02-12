const Fastify = require('fastify');
const mercurius = require('mercurius');
const { schema } = require('./schema')

const startup = async () => {
    const app = Fastify();
    await app.register(mercurius, {
        schema,
        subscription: true
    })

    app.listen(4500, (err, address) => {
        if (err) {
            console.log.error(err);
            process.exit(1);
        }
        console.info("Server running on port 4500")
    })
};

startup();