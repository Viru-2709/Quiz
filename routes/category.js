var express = require('express');
var router = express.Router();
const categoryController = require('../Controller/category')
const jet = require('jsonwebtoken')
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

//Create Category
router.post('/add', upload.single('image'), categoryController.Secure, categoryController.Add_Category);

// Get Category
router.get('/all', categoryController.All_Category);

// Update Category
router.patch('/edit/:id', upload.single('image'), categoryController.Secure, categoryController.Update_Category);

// Delete Category
router.delete('/delete/:id', categoryController.Secure, categoryController.Delete_Category);


module.exports = router;
