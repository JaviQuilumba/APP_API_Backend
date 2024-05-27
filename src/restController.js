const express = require('express');
const router = express.Router();

// Lista de películas
let movies = [
    {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        coverImage: 'https://s1.eestatic.com/2015/02/17/actualidad/actualidad_11759078_128421010_1706x960.jpg'
    },
    {
        id: 2,
        title: 'The Matrix',
        director: 'Lana and Lilly Wachowski',
        year: 1999,
        coverImage: 'https://i.pinimg.com/564x/24/7d/25/247d25bbc57ca3c716c6e3200cc56d5c.jpg'
    },
    {
        id: 3,
        title: 'Interstellar',
        director: 'Christopher Nolan',
        year: 2014,
        coverImage: 'https://images.fandango.com/ImageRenderer/500/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/176739/Interstellar-Film.jpg'
    }
];

// Obtener todas las películas
router.get('/movies', (req, res) => {
    res.json(movies);
});

// Obtener una sola película por ID
router.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('La película no fue encontrada');
    res.json(movie);
});

// Crear una nueva película
router.post('/movies', (req, res) => {
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        coverImage: req.body.coverImage // Agregar la portada de la película desde el cuerpo de la solicitud
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// Actualizar una película existente
router.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('La película no fue encontrada');

    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.year = req.body.year;
    movie.coverImage = req.body.coverImage; // Actualizar la portada de la película si se proporciona
    res.json(movie);
});

// Eliminar una película
router.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).send('La película no fue encontrada');

    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie);
});

module.exports = router;
