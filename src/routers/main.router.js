const express = require('express');
const path = require('path');
const router = express.Router();

// const configurations = require('../configurations');
// const userService = require('../services/user.service');
// const dataService = require('../services/database.service');

// Index route
router
    .get(`/`, (req, res) => {
        res.render('index', {
            title: 'Home',
            activeUrl: `/`,
            goods: [
                'Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.'
            ],
            bads: [
                'Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.',
                'Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.',
                'Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.',
            ],
            actions: [
                'Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.',
                'Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.',
            ],
        });
    });

module.exports = router;