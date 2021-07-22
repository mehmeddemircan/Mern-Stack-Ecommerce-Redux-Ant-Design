const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


const router= express.Router();
// Controllers
const {create,read,update,remove,list,getSubs}  = require('../controllers/categoryControllers')

// Routes
router.route('/category').post(isAuthenticatedUser, authorizeRoles('admin'), create)
router.route('/categories').get(list)
router.route('/category/:slug').get(read)
router.route('/category/:slug').put(update)
router.route('/category/:slug').delete(isAuthenticatedUser,authorizeRoles('admin'),remove)
router.route('/category/subs/:_id').get(getSubs)


module.exports = router;