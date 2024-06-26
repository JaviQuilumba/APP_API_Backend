const { gql } = require('apollo-server-express');

// Definir el esquema GraphQL
const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    director: String!
    year: Int!
    coverImage: String
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
  }

  type Mutation {
    addMovie(title: String!, director: String!, year: Int!, coverImage: String): Movie
    updateMovie(id: ID!, title: String!, director: String!, year: Int!, coverImage: String): Movie
    deleteMovie(id: ID!): Movie
  }
`;

// Datos de películas (simulados)
let movies = [
    {
        id: '1',
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        coverImage: 'https://s1.eestatic.com/2015/02/17/actualidad/actualidad_11759078_128421010_1706x960.jpg'
    },
    {
        id: '2',
        title: 'The Matrix',
        director: 'Lana and Lilly Wachowski',
        year: 1999,
        coverImage: 'https://i.pinimg.com/564x/24/7d/25/247d25bbc57ca3c716c6e3200cc56d5c.jpg'
    },
    {
        id: '3',
        title: 'Interstellar',
        director: 'Christopher Nolan',
        year: 2014,
        coverImage: 'https://images.fandango.com/ImageRenderer/500/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/176739/Interstellar-Film.jpg'
    }
];

// Resolvers para las consultas y mutaciones
const resolvers = {
    Query: {
        movies: () => movies,
        movie: (_, { id }) => movies.find(movie => movie.id === id),
    },
    Mutation: {
        addMovie: (_, { title, director, year, coverImage }) => {
            const id = String(movies.length + 1);
            const newMovie = { id, title, director, year, coverImage };
            movies.push(newMovie);
            return newMovie;
        },
        updateMovie: (_, { id, title, director, year, coverImage }) => {
            const index = movies.findIndex(movie => movie.id === id);
            if (index === -1) {
                throw new Error('Movie not found');
            }
            movies[index] = { ...movies[index], title, director, year, coverImage };
            return movies[index];
        },
        deleteMovie: (_, { id }) => {
            const index = movies.findIndex(movie => movie.id === id);
            if (index === -1) {
                throw new Error('Movie not found');
            }
            const [deletedMovie] = movies.splice(index, 1);
            return deletedMovie;
        }
    }
};

module.exports = { typeDefs, resolvers };
