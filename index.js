const express= require('express');

// same as `import` from react
const db= require('./database.js');

//creates server
const server= express();

// some form of middleware that allows our api to parse request bodies
// that are json objects into a reg object

server.use(express.json());

server.get('/', (req, res) => {
    res.json({message: 'Hello, World. Welcome to my server :)'});
})

server.get('/chars', (req, res) => {
    // this function is being imported from the database 
    // calling the chars arr

    const chars= db.getChars()

    if(chars){
        res.json(chars);
    } else{
        res.status(500).json({
            errorMessage: "The chars information could not be retrieved.",
        })
    }
})

server.get('/chars/:id', (req, res) => {
    // our route params come into variables with the same name as the param.
    // so :id === req.params.id

    const charID= req.params.id
    const char= db.getCharsById(charID);

    if(char){
        res.json(char)
    } else{
        res.status(404).json({
            message: 'User not found',
        })
    }

    // If there's an error in retrieving the user from the database:
    //
})

server.post('/chars', (req, res) => {
    // we don't want to create a user with an empty name or bio, so check for it

    if(!req.body.name || !req.body.bio){
        return res.status(400).json({
            message: 'Please provide name and bio for the user.'
        })
    }

    const newChar= db.createChar({
        id: db.shortID.generate(),
        name: req.body.name,
        bio: req.body.bio,
    })

    // 201 status code means a resource was successfully created
    
    res.status(201).json(newChar);

    // If there's an error while saving the user:
    //

})

server.patch('/chars/:id', (req, res) => {
   const char= db.getCharsById(req.params.id);
   
   // can't update a user that doesn't exist, so make sure it exists first
       if(char){
           const updatedChar= db.updateChar(
            char.id,
            // use a fallback value if no name is specified, so it doesn't empty the field 
            {
                name: req.body.name || char.name,
                bio: req.body.bio || char.bio,
            })

            res.status(200).json(updatedChar);
       } else{
            res.status(404).json({
                message: 'The user with the specified ID does not exist.',
            })
       }

    //    if(!req.body.name && req.body.bio){
    //        return res.json(updateChar)
    //    } else if(!req.body.bio && req.body.name){
    //        return res.json(updateChar)
    //    } else{
    //        res.status(400).json({
    //         errorMessage: "Please provide name or bio for the user."
    //        })
    //    }

    // if there's an error when updating the user:

    // if the request body is missing the name or bio property:
})

server.delete('/chars/:id', (req, res) => {
    const char= db.getCharsById(req.params.id)

    if(char){
        db.deleteChar(char.id)
        console.log('Deleted character:', char)
        res.status(204).end();
    } else{
        res.status(404).json({
			message: "The user with the specified ID does not exist.",
		})
    }

    // If there's an error in removing the user from the database:
    //
})

const port= 3030;

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
})