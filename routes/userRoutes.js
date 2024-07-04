const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/user', userController.getUser);
router.get('/users', userController.getUsers);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;