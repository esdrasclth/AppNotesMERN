const notesCtrl = {};

notesCtrl.getNotes = (req, res) => res.json({message: []});
notesCtrl.createNotes = (req, res) => res.json({message: 'Notes Saved'});

notesCtrl.getNote = (req, res) => res.json({message: []});
notesCtrl.updateNote = (req, res) => res.json({message: 'Notes Update'});
notesCtrl.deleteNote = (req, res) => res.json({message: 'Notes Deleted'});

module.exports = notesCtrl;