const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genres = [
    {
        id: 1,
        name: 'Rebel Moon - Part Two: The Scargiver',
        genre: ['Action', 'Science Fiction', 'Drama']
    },
    {
        id: 2,
        name: 'Kingdom of the Planet of the Apes',
        genre: ['Adventure', 'Action', 'Science Fiction']
    },
    {
        id: 3,
        name: 'Kung Fu Panda 4',
        genre: ['Family', 'Comedy', 'Animation', 'Action', 'Fantasy']
    }
];

// get all movies with genres
router.get('/', (req, res) => {
    res.send(genres);
});

// add a movie with genres
router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        genre: Joi.array().min(1).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
        genre: req.body.genre
    };

    genres.push(genre);
    res.send(genre);
});

// get movie with genre based on id
router.get('/:id', (req, res) => {
    const genre = genres.find(asset => asset.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('no content found with the id');
    res.send(genre);
});

// update genres and movie name
router.put('/:id', (req, res) => {
    const genre = genres.find(asset => asset.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('no content found with the id');
    
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        genre: Joi.array().min(1).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genre.name = req.body.name;
    genre.genre = req.body.genre;
    res.send(genre);
});

// delete movie
router.delete('/:id', (req, res) => {
    const genre = genres.find(asset => asset.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('no content found with the id');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

module.exports = router;