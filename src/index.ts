import express from 'express';
import { read,write } from './fs.service';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    try {
        const users = await read();
        res.send(users);
    } catch (error) {
        res.status(500);
    }
});

app.post('/users', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || name.length < 3) {
        return res.status(400).send(
          "Name is required and should be at least 3 characters long");
      }
      if (!email || !email.includes("@")) {
        return res.status(400).send("Email is required and should be valid");
      }
      if (!password || password.length < 6) {
        return res.status(400).send(
          "Password is required and should be at least 6 characters long");
      }

      const users = await read();

        const id = users.length ? users[users.length - 1].id + 1 : 1;
        const newUser = {id, name, email, password};
        users.push(newUser);
        res.status(201).send(newUser);
    } catch (e) {
        res.status(500);
    }
});

