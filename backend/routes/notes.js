const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser'); // importing middleware
const Notes = require('../models/Notes'); // importoing Notes Modle
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

//---> ROUTE 1 : GET ALL THE NOTES using : GET "/api/suth/getuser" . login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        // finding user with user id
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) { // sending error if not found
        console.log(error.message);
        res.status(500).semd("Internal Server Error")
    }
});

//---> ROUTE 2 : Add a new Note using : POSt "/api/auth/addnote" . Login Required 
router.post('/addnote', fetchuser, [ // Validating Notes Feilds
    body('title', 'Title can not be empty').isLength({ min: 3 }),
    body('description', 'Description must be more then 5').isLength({ min: 5 })
], async (req, res) => {
    try {
        // destructuring body : taking out neccesary variable
        const { title, description, tag } = req.body; // this will come post body or from cleint side
        const error = validationResult(req); // this varibale catches any error which accures
        if (!error.isEmpty()) { // sending response if error happens
            return res.status(400).json({ errors: error.array() });
        }

        // Intializing Notes Constructor with the values we got from body
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save(); // saving notes 

        res.json(note);// printing note that has been saved in the database 
    } catch (error) { // If any error ouccer will show bad request 
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
});

//---> ROUTE 3 : Update an existing NOTE using : POSt "/api/suth/updatenote" . login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create new note object
        const newNote = {};
        // putting all values in the newNote object
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {// if note is not in db
            return res.status(404).send('Not Found');
        }
        if (note.user.toString() !== req.user.id) { // validating if the user is the owner of the note or not
            return res.status(401).send("Not Allowed");
        }

        // last we will update the note using findByIdAndUpdate method
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {

    }
});

//----> ROUTE 4 : delete sn existing note using : Delete /api/notes/deletenote . Login Required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Allows user to delete the note only if he or she own the note
        if (note.user.toString() !== req.user.id) { // validating if the user is the owner of the note or not
            return res.status(401).send("Not Allowed");
        }
        // finding the note by id and deleteing it using findByIdAndDelete
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been Deleted.", note: note });
    } catch (error) {
        console.log("Internal Server Error.");
        res.status(500).send("Internal Server Error.")
    }
});
module.exports = router;