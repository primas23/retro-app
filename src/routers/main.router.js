const express = require('express');
const router = express.Router();

const commentsService = require('../services/comments.service');

// Index route
router
    .get(`/`, async (req, res) => {

        const allComments = await commentsService.gettingAllComments();

        res.render('main/index', {
            title: 'Home',
            activeUrl: `/`,
            data: allComments.data,
            errorMessage: allComments.message,
        });
    });

router
    .post(`/create-comment`, async (req, res) => {
        const text = req.body.text;
        const type = req.body.type;

        const insertingComment = await commentsService.insertingComment(text, type);
        const allComments = await commentsService.gettingAllComments();

        res.render('main/index', {
            title: 'Home',
            activeUrl: `/`,
            data: allComments.data,
            errorMessage: insertingComment.message || allComments.message || null,
        });

    });

router
    .get(`/delete-comment/:commentId`, async (req, res) => {
        const commentId = req.params.commentId;

        const deletingComment = await commentsService.deletingComment(commentId);
        const allComments = await commentsService.gettingAllComments();

        res.render('main/index', {
            title: 'Home',
            activeUrl: `/`,
            data: allComments.data,
            errorMessage: deletingComment.message || allComments.message || null,
        });

    });

module.exports = router;