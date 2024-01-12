var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category')
const usersController = require('../controllers/users')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/category')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET categorys listing. */
router.get('/', usersController.Secure, categoryController.AllCategory);
router.post('/', upload.single('image'), categoryController.AddCategory);
router.put('/', upload.single('image'), categoryController.UpdateCategory);
router.delete('/', categoryController.DeleteCategory);

module.exports = router;
