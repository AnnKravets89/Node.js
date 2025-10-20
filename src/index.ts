import express, {NextFunction, Request, Response} from 'express';
import {read, write} from './fs.service';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await read();
        res.send(users);
    } catch (error) {
        res.status(500);
    }
});

app.post('/users', async (req: Request, res: Response, next: NextFunction) => {
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

app.put('/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
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

        const users = await read();

        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }

        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = password;

        await write(users);
        res.status(201).send(users[userIndex]);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.delete('/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const users = await read();

        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }
        users.splice(userIndex, 1);

        await write(users);
        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
