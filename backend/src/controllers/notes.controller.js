const notesCtrl = {};
const Note = require('../models/Notes');

notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
} 

notesCtrl.createNotes = async (req, res) => {
    const {title, content, date, author} = req.body;
    const newNote = new Note({
        title: title,
        content: content,
        date: date,
        author: author
    });
    await newNote.save();
    res.json({message: 'Notes Saved'})
};

notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    console.log(note);
    res.json(note)
};

notesCtrl.updateNote = async (req, res) => {
    const {title, content, date, author} = req.body;
    await Note.findOneAndUpdate({_id: req.params.id}, {
        title: title,
        author: author,
        content: content
    });
    res.json({message: 'Notes Update'})
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findOneAndDelete(req.params.id)
    res.json({message: 'Notes Deleted'})
};

module.exports = notesCtrl;