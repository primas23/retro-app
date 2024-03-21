const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const location = path.join('./db/data.db');

const db = new sqlite3.Database('data.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the database.');
        db.run('CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, type TEXT)');
    }
});

function gettingAllComments() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM comments', (err, rows) => {
            if (err) {
                const message = `Error querying data: ${err.message}`;
                console.error(message);
                resolve({
                    isSuccess: false,
                    message,
                    data: null,
                });
            } else {
                resolve({
                    isSuccess: true,
                    message: null,
                    data: rows.map(row => ({
                        id: row.id,
                        text: row.text,
                        type: row.type
                    })),
                });
            }
        });
    });
}

function insertingComment(text, type) {
    return new Promise((resolve, reject) => {
        if (!text || !type) {
            const message = `Error inserting data: type or text is missing`;
            console.error(message);
            resolve({
                isSuccess: false,
                message,
                data: null,
            });
        } else {
            db.run('INSERT INTO comments (text, type) VALUES (?, ?)', [text, type], function (err) {
                if (err) {
                    const message = `Error inserting data: ${err.message}`;
                    console.error(message);
                    resolve({
                        isSuccess: false,
                        message,
                        data: null,
                    });
                } else {
                    console.log(`A row has been inserted with id ${this.lastID}`);
                    resolve({
                        isSuccess: true,
                        message: null,
                        data: this.lastID,
                    });
                }
            });
        }

    });
}

function deletingComment(commentId) {
    return new Promise((resolve, reject) => {
        if (!commentId) {
            const message = `Error deleting data: commentId is missing`;
            console.error(message);
            resolve({
                isSuccess: false,
                message,
                data: null,
            });
        } else {
            db.run('DELETE FROM comments WHERE id = ?', [commentId], function (err) {
                if (err) {
                    const message = `Error deleting data: ${err.message}`;
                    console.error(message);
                    resolve({
                        isSuccess: false,
                        message,
                        data: null,
                    });
                } else {
                    console.log(`A row has been inserted with id ${commentId}`);
                    resolve({
                        isSuccess: true,
                        message: null,
                        data: commentId,
                    });
                }
            });
        }

    });
}

module.exports = {
    gettingAllComments,
    insertingComment,
    deletingComment,
}