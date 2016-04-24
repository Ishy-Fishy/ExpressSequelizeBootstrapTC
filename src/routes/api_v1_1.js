"use strict";
var router = require('express').Router();
var path = require('path');

var organizationController = require('../controller/organization.js');
var userController = require('../controller/user.js');

// -------------------------------------------------------
// ORGANIZATION
// -------------------------------------------------------
router.get('/organization',  organizationController.getAll);
router.post('/organization',  organizationController.create);
router.put('/organization/:id',  organizationController.update);
router.delete('/organization/:id',  organizationController.delete);

// -------------------------------------------------------
// USER
// -------------------------------------------------------
router.post('/user',  userController.create);

// -------------------------------------------------------
// Homework
// -------------------------------------------------------

// 1. update user API

router.put('/user', userController.update);
// 2. delete user API
router.delete('/user/:id', userController.delete);
// 3. get all user by organization id
router.get('/user/:id/org', userController.getUserOrgId);
// 3a. get list of user by organization id and filter by title specified in query string
router.get('/user/:id', userController.getUserOrgFilter);

module.exports = router;
