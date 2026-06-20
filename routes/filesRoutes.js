
const {getAllFiles,createFiles} = require('../controllers/filesController');
const upload = require('../middleware/uploadMiddleware');

const express = require('express');
const router = express();

router.get('/',getAllFiles);
router.post('/',upload.single('file_upload'),createFiles);

module.exports = router;