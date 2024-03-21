const databaseService = require('../services/database.service');

async function gettingAllComments() {
    const allCommentsResponse = await databaseService.gettingAllComments();

    if (allCommentsResponse.isSuccess) {
        const dataGroups = [
            {
                type: 'good',
                data: allCommentsResponse.data.filter(comment => comment.type === 'good'),
            },
            {
                type: 'bad',
                data: allCommentsResponse.data.filter(comment => comment.type === 'bad'),
            },
            {
                type: 'action',
                data: allCommentsResponse.data.filter(comment => comment.type === 'action'),
            }
        ];

        return {
            isSuccess: allCommentsResponse.isSuccess,
            message: allCommentsResponse.message,
            data: dataGroups
        };
    }

    return allCommentsResponse;
}

async function insertingComment(text, type) {
    return await databaseService.insertingComment(text, type);
}

async function deletingComment(commentId) {
    return await databaseService.deletingComment(commentId);
}

module.exports = {
    gettingAllComments,
    insertingComment,
    deletingComment,
}