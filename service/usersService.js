const fsPromises = require('node:fs/promises');
const path = require('node:path');

const users = [
    {id: 1, name: 'Maksym', email: 'feden@gmail.com', password: 'qwe123'},
    {id: 2, name: 'Alina', email: 'alindosik@gmail.com', password: 'ert345'},
    {id: 3, name: 'Anna', email: 'ann43@gmail.com', password: 'ghj393'},
    {id: 4, name: 'Tamara', email: 'tomochka23@gmail.com', password: 'afs787'},
    {id: 5, name: 'Dima', email: 'taper@gmail.com', password: 'rtt443'},
    {id: 6, name: 'Rita', email: 'torpeda@gmail.com', password: 'vcx344'},
    {id: 7, name: 'Denis', email: 'denchik@gmail.com', password: 'sdf555'},
    {id: 8, name: 'Sergey', email: 'BigBoss@gmail.com', password: 'ccc322'},
    {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343'},
    {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222'},
];

const pathToFile = path.join(__dirname, '../users-db.json');

const readUsersFromFile = async () => {
    try {
        const data = await fsPromises.readFile(pathToFile, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        if (e.code === 'ENOENT') {
            await saveUsersToFile(users);
            return users;
        }
        console.log('Users not found', e.message);
        return [];
    }
};

const saveUsersToFile = async (users) => {
    const data = JSON.stringify(users, null, 2);
    await fsPromises.writeFile(pathToFile, data, 'utf8');
}
module.exports =  { readUsersFromFile, saveUsersToFile };
