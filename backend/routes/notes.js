const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchUser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');


//Route 1:  Get all the Notes using : GET "/api/auth/getuser". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
try{
   const notes = await Note.find({user: req.user.id})
    res.json(notes)
}
 catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
      }
})

//Route 2:  Add a new Notes using : POST "/api/auth/addnote". login required

router.post('/addnote', fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Description must be atleast 5 character').isLength({ min: 5 })
] , async (req, res) => {
    try{
    const {title, description, tag} = req.body;

    // if there are error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title, description, tag, user: req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote)
}catch(error){
    console.error(error.message);
    res.status(500).send('Internal server error')
}
})

//Route 3:  update an existing Notes using : PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser , async (req, res) => {
const {title, description, tag} = req.body;
try {
    
// Create a Note Object
const newNote = {};
if(title){newNote.title = title};
if(description){newNote.description = description};
if(tag){newNote.tag = tag};

// Find the note to be update and update it
let note = await Note.findById(req.params.id);
if(!note){
    return res.status(404).send("Not Found")
}
if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
}

note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
res.json({note});
}catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error')
}
})


//Route 4:  Delete an existing Notes using : DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser , async (req, res) => {
try {
// Find the note to be delete and update it
let note = await Note.findById(req.params.id);
if(!note){
    return res.status(404).send("Not Found")
}
// Allow deletion only if user owns this Note
if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
}

note = await Note.findByIdAndDelete(req.params.id)
res.json({"Success" : "Note has been deleted", note : note});

} catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error')
}
})
module.exports = router