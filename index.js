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
            errorMessage: "The character information could not be retrieved.",
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
    } else if(!char){
        res.status(404).json({
            message: 'Character not found',
        })
    } else{
        res.status(500).json({
            errorMessage: "The character information could not be retrieved." 
        })
    }
})

server.post('/chars', (req, res) => {
    // we don't want to create a user with an empty name or bio, so check for it

    if(!req.body.name || !req.body.bio){
        return res.status(400).json({
            message: 'Please provide name and bio for the character.'
        })
    }

    const newChar= db.createChar({
        id: db.shortID.generate(),
        name: req.body.name,
        bio: req.body.bio,
    })

    // 201 status code means a resource was successfully created
    
    if(newChar){
        res.status(201).json(newChar)
    } else{
        res.status(500).json({
            errorMessage: "There was an error while saving the character to the database."
        })
    }

})

server.patch('/chars/:id', (req, res) => {
   const char= db.getCharsById(req.params.id);

//    if(!req.body.name || !req.body.bio){
//         res.status(400).json({
//             message: "Please enter a name or bio."
//         })
//     }
   
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
       } else if(!char){
            res.status(404).json({
                message: 'The character with the specified ID does not exist.',
            })
       } else{
           res.status(500).json({
               message: 'The character information could not be modified.'
           })
       }
})

server.delete('/chars/:id', (req, res) => {
    const char= db.getCharsById(req.params.id)

    if(char){
        db.deleteChar(char.id)
        console.log('Deleted character:', char)
        res.status(204).end();
    } else if(!char){
        res.status(404).json({
			message: "The character with the specified ID does not exist.",
		})
    } else{
        res.status(500).json({
            errorMessage: 'The character could not be removed.',
        })
    }
})

const port= 3030;

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
})