const config = require('dotenv').config();
const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json())

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
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

// add a movie with genres
app.post('/api/genres', (req, res) => {
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
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(asset => asset.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('no content found with the id');
    res.send(genre);
});

// update genres and movie name
app.put('/api/genres/:id', (req, res) => {
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
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(asset => asset.id === parseInt(req.params.id));
    if (!genre) return res.status(400).send('no content found with the id');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}...`));