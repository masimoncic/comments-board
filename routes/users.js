const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const wrapAsync = require('../utils/wrapAsync')
const passport = require('passport');
const { wrap } = require('module');


router.route('/register')
    .get(users.renderRegister)
    .post(wrapAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/users/login'}),
        wrapAsync(users.login))


//router.get('/logout', users.logout);


module.exports = router;