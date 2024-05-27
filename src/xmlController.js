const express = require('express');
const xml2js = require('xml2js');
const builder = new xml2js.Builder();

const router = express.Router();

// Datos simulados para las películas
let movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010, coverImage: 'https://s1.eestatic.com/2015/02/17/actualidad/actualidad_11759078_128421010_1706x960.jpg' },
    { id: 2, title: 'The Matrix', director: 'Lana and Lilly Wachowski', year: 1999, coverImage: 'https://i.pinimg.com/564x/24/7d/25/247d25bbc57ca3c716c6e3200cc56d5c.jpg' },
    { id: 3, title: 'Interstellar', director: 'Christopher Nolan', year: 2014, coverImage: 'https://images.fandango.com/ImageRenderer/500/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/176739/Interstellar-Film.jpg' },
];

// Obtener todas las películas
router.get('/movies', (req, res) => {
    const xmlMovies = movies.map(movie => ({
        movie: {
            id: movie.id,
            title: movie.title,
            director: movie.director,
            year: movie.year,
            coverImage: movie.coverImage
        }
    }));
    const xml = builder.buildObject({ movies: xmlMovies });
    res.type('application/xml');
    res.send(xml);
});

// Obtener una película por ID
router.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);
    if (movie) {
        const xml = builder.buildObject({ movie: { ...movie } });
        res.type('application/xml');
        res.send(xml);
    } else {
        res.status(404).send('<error>Movie not found</error>');
    }
});

// Agregar una nueva película
router.post('/movies', (req, res) => {
    xml2js.parseString(req.body, (err, result) => {
        if (err) {
            res.status(400).send('<error>Invalid XML</error>');
        } else {
            const newMovie = {
                id: movies.length + 1,
                title: result.movie.title[0],
                director: result.movie.director[0],
                year: parseInt(result.movie.year[0]),
                coverImage: result.movie.coverImage[0]
            };
            movies.push(newMovie);
            const xml = builder.buildObject({ movie: newMovie });
            res.type('application/xml');
            res.send(xml);
        }
    });
});

// Actualizar una película por ID
router.put('/movies/:id', (req, res) => {
    xml2js.parseString(req.body, (err, result) => {
        if (err) {
            res.status(400).send('<error>Invalid XML</error>');
        } else {
            const index = movies.findIndex(m => m.id == req.params.id);
            if (index !== -1) {
                movies[index] = { ...movies[index], ...result.movie };
                const xml = builder.buildObject({ movie: movies[index] });
                res.type('application/xml');
                res.send(xml);
            } else {
                res.status(404).send('<error>Movie not found</error>');
            }
        }
    });
});

// Eliminar una película por ID
router.delete('/movies/:id', (req, res) => {
    const index = movies.findIndex(m => m.id == req.params.id);
    if (index !== -1) {
        const deletedMovie = movies.splice(index, 1);
        const xml = builder.buildObject({ movie: deletedMovie[0] });
        res.type('application/xml');
        res.send(xml);
    } else {
        res.status(404).send('<error>Movie not found</error>');
    }
});

module.exports = router;
