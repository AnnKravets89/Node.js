const express = require('express');

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
    res.send('Hello World!');
});
app.post('/users', (req, res) => {
    res.send('Hello Everybody!');
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
