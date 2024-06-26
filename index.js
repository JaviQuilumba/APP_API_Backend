const express = require('express');
const restController = require('./src/restController');
const xmlController = require('./src/xmlController');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./src/graphqlController');

const app = express();

//Configurar puerto en el Digital
const port = 8081;

app.use(cors({
    origin: 'https://app-apis-ftend-c4a49.ondigitalocean.app'
}));

app.use(express.json());


// Middleware para manejar cuerpos de texto (XML)
app.use(express.text({ type: 'application/xml' }));

// Rutas RESTful
app.use('/api', restController);

// Rutas para manejo de XML
app.use('/xml', xmlController);

// Configurar Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Inicializar el servidor Apollo de manera asíncrona
const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
        console.log(`GraphQL endpoint: http://localhost:${port}${server.graphqlPath}`);
    });
};

startServer();