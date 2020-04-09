const express= require('express');

const db= require('./database.js');

const server= express();

// some form of middleware that allows our api to parse request bodies
// that are json objects into a reg object

server.use(express.json());

server.get('/', (req, res) => {
    res.json({message: 'Hello, World. Welcome to my server :)'});
})

server.get('/users', (req, res) => {
    // this function is being imported from the database 
    // calling the users arr

    const users= db.getUsers()

    if(users){
        res.json(users);
    } else{
        res.status(500).json({
            errorMessage: "The users information could not be retrieved.",
        })
    }
})

server.get('/users/:id', (req, res) => {
    // our route params come into variables with the same name as the param.
    // so :id === req.params.id

    const userID= req.params.id
    const user= db.getUserById(userID);

    if(user){
        res.json(user)
    } else{
        res.status(404).json({
            message: 'User not found',
        })
    }
})

server.post('/users', (req, res) => {
    // we don't want to create a user with an empty name or bio, so check for it

    if(!req.body.name || !req.body.bio){
        return res.status(400).json({
            message: 'Please provide name and bio for the user.'
        })
    }

    const newUser= db.createUser({
        id: db.shortID.generate(),
        name: req.body.name,
        bio: req.body.bio,
    })

    // 201 status code means a resource was successfully created
    
    res.status(201).json(newUser);

})

server.listen(3030, () => {
    console.log('Server listening on port 3030');
})