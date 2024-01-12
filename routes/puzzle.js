var express = require('express');
var router = express.Router();
const puzzleController = require('../controllers/puzzle')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/puzzle')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET puzzles listing. */
router.get('/', puzzleController.AllPuzzle);
router.post('/', upload.single('image'), puzzleController.AddPuzzle);
router.put('/', upload.single('image'), puzzleController.UpdatePuzzle);
router.delete('/', puzzleController.DeletePuzzle);

module.exports = router;
