const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


const router= express.Router();
// Controllers
const {create,read,update,remove,list}  = require('../controllers/subControllers')

// Routes
router.route('/sub').post( create)
router.route('/subs').get(list)
router.route('/sub/:slug').get(read)
router.route('/sub/:slug').put(update)
router.route('/sub/:slug').delete(isAuthenticatedUser,authorizeRoles('admin'),remove)


module.exports = router;