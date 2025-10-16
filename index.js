const express = require('express');
const { readUsersFromFile, saveUsersToFile } = require('./service/usersService');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    try {
        const users = await readUsersFromFile();
        res.json(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get('/users/:userId', async (req, res) => {
    try {
        const users = await readUsersFromFile();
        const userId = Number(req.params.userId);
        const user = users.find((user) => user.id === userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.post('/users', async (req, res) => {
     try {
         const users = await readUsersFromFile();
         const {name, email, password} = req.body;

             if (name.length < 3) {
                 throw new Error('Name should be at least 3 characters long');
             }
             if (!email || !email.includes("@")) {
                 throw new Error("Email is required and should include @");
             }
             if (password.length < 6) {
                 throw new Error(
                     "Password  should be at least 6 characters long");
             }

         const id = users.length ? users[users.length - 1].id + 1 : 1;
         const newUser = {id, name, email, password};
         users.push(newUser);
         await saveUsersToFile(users);
         res.status(201).json(newUser);
     } catch (e) {
         res.status(500).send(e.message);
     }
});

app.put('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const {name, email, password} = req.body;

            if (name.length < 3) {
                throw new Error('Name should be at least 3 characters long');
            }
            if (!email || !email.includes("@")) {
                throw new Error("Email is required and should include @");
            }
            if (password.length < 6) {
                throw new Error(
                    "Password  should be at least 6 characters long");
            }

        const users = await readUsersFromFile();

        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }

        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = password;

        await saveUsersToFile(users);
        res.status(201).send(users[userIndex]);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.delete('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const users = await readUsersFromFile();

        const userIndex = users.findIndex(user => user.id === userId);
            if (userIndex === -1) {
                return res.status(404).send('User not found');
            }
        users.splice(userIndex, 1);

        await saveUsersToFile(users);
        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
