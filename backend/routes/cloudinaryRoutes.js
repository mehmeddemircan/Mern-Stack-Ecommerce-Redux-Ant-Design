const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


const router= express.Router();
// Controllers
const {upload, remove, removeavatar, uploadavatar, uploadreviewpicture, removeReviewPicture }  = require('../controllers/cloudinaryControllers')

// Routes
router.route('/uploadimages').post(upload)
router.route('/removeimage').post(remove)
router.route('/removeavatar').post(removeavatar)
router.route('/uploadavatar').post(uploadavatar)
router.route('/uploadreviewpicture').post(uploadreviewpicture)
router.route('/removereviewpicture').post(removeReviewPicture)



module.exports = router;