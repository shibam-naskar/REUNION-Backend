const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const PropertyController = require('../controllers/property')
const middlewere = require('../middleweres/verifytoken')

router.post('/signup',  UserController.signupUser);
router.post('/login',  UserController.signinUser);


router.post('/property', middlewere.verifyToken, PropertyController.addProperety);
router.put('/property/:id', middlewere.verifyToken, PropertyController.updateProperty);
router.delete('/property/:id', middlewere.verifyToken, PropertyController.deleteProperty);
router.get('/property/:id', middlewere.verifyToken, PropertyController.listPropertiesByOwner);

router.get('/properties/filter', PropertyController.getFilteredProperties);


module.exports = router;