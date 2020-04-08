const express= require('express');

const db= require('./database.js');

const server= express();

server.get('/', (req, res) => {
    res.json({message: 'Hello, World. Welcome to my server :)'});
})

server.get('/users', (req, res) => {
    const users= db.getUsers()
    res.json(users);
})

server.listen(3030, () => {
    console.log('Server is listening on port 3030');
})