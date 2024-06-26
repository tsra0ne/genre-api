const config = require('dotenv').config();
const genres = require('./routes/genres');
const express = require('express');

const app = express();

app.use(express.json());
app.use('/api/genres', genres);

app.use('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}...`));