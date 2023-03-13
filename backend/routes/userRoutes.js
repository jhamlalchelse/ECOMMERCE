const express = require('express')
const { registerUser, loginUser, logoutUser, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userControllers')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me').get(isAuthenticatedUser, getUserDetails)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("admin","stuff"), getAllUser)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin","stuff"), getSingleUser)
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)


module.exports = router