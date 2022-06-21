const express = require('express');
const mysql = require('mysql');
var connection  = require('database.js');


// Connect
connection.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

// Display products in the table
app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM product';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});


app.get('/education', (req, res) => {
    let sql = 'SELECT * FROM education';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});


app.get('/food', (req, res) => {
    let sql = 'SELECT * FROM food';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});


app.get('/places', (req, res) => {
    let sql = 'SELECT * FROM places';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});


app.get('/shopping', (req, res) => {
    let sql = 'SELECT * FROM shopping';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});


app.get('/stay', (req, res) => {
    let sql = 'SELECT * FROM stay';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});


app.get('/travel', (req, res) => {
    let sql = 'SELECT * FROM travel';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});


app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM users';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});
// // Create table
// app.get('/createpoststable', (req, res) => {
//     let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Posts table created...');
//     });
// });

// // Insert post 1
// app.get('/addpost1', (req, res) => {
//     let post = {title:'Post One', body:'This is post number one'};
//     let sql = 'INSERT INTO posts SET ?';
//     let query = db.query(sql, post, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post 1 added...');
//     });
// });

// // Insert post 2
// app.get('/addpost2', (req, res) => {
//     let post = {title:'Post Two', body:'This is post number two'};
//     let sql = 'INSERT INTO posts SET ?';
//     let query = db.query(sql, post, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post 2 added...');
//     });
// });

// // Select posts
// app.get('/getposts', (req, res) => {
//     let sql = 'SELECT * FROM posts';
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.send('Posts fetched...');
//     });
// });

// // Select single post
// app.get('/getpost/:id', (req, res) => {
//     let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post fetched...');
//     });
// });

// // Update post
// app.get('/updatepost/:id', (req, res) => {
//     let newTitle = 'Updated Title';
//     let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post updated...');
//     });
// });

// // Delete post
// app.get('/deletepost/:id', (req, res) => {
//     let newTitle = 'Updated Title';
//     let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Post deleted...');
//     });
// });

app.listen('3000', () => {
    console.log('Server started on port 3000');
});