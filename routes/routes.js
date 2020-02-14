const express = require('express');
const app = express.Router();
const path = require("path");
const repository = require("../repository/userRepository");

let selectedUser = {
    id: null
}

express().set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render('newUser.pug')
})

app.get("/viewUsers", (req, res) => {
    repository.findAll().then((users) => {
        res.render('viewUsers.pug', {data: users});
    }).catch(err => console.log(err));
})

app.get('/delete', (req, res) => {
    res.render('delete.pug');
})

app.get("/edit", (req, res) => {
    res.render('edit.pug');
})

app.post("/newUser", (req, res) => {
    let {userName, first, last, email, age} = req.body;
    let userObj = {userName, first, last, email, age};
    repository.create(userObj).then(() => {
        res.redirect('/');
    }).catch(() => res.render('notFound.pug', {data: 'Make Sure All Fields Are Filled In'}))
})

app.post('/edit', (req, res) => {
    let id = req.body.id;
    selectedUser.id = id;
    repository.findById(id).then((user) => {
        if(user.length == 0) {
            res.render('notFound.pug', {data: 'User ID does not exist, try checking again'})
        } else res.render("editUser.pug", {data: user[0]});
    }).catch((err) => console.log(err));
})

app.post('/delete', (req, res) => {
    repository.deleteById(req.body.id).then(() => {
        res.redirect('/users/viewUsers')
    }).catch(() => res.render('notFound.pug', {data: 'User ID does not exist, try checking again'}))
})

app.post('/editUser', (req, res) => {
    let {userName, first, last, email, age} = req.body;
    let userObj = {userName, first, last, email, age};
    repository.updateById(selectedUser.id, userObj).then(() => {
        res.redirect('/');
    }).catch(err => console.log(err));
})

app.post('/sort', (req, res) => {
    if(req.body.select == 'a-z') {
        repository.sortAZ().then((users) => {
            res.render('viewUsers.pug', {data: users})
        })
    } else if(req.body.select == 'z-a') {
        repository.sortZA().then((users) => {
            res.render('viewUsers.pug', {data: users})
        })
    } else {
        repository.findAll().then((users) => {
            res.render('viewUsers.pug', {data: users})
        })
    }
})

app.post('/search', (req, res) => {
    if(req.body.first) {
        repository.searchFirst(req.body.first).then((user) => {
            if(user.length == 0) {
                res.render('notFound.pug', {data: 'This User Does Not Exist. All names are case sensitive'})
            } else {
                res.render('searched.pug', {data: user})
            }
        })
    } else {
        repository.searchLast(req.body.last).then((user) => {
            if(user.length == 0) {
                res.render('notFound.pug', {data: 'This User Does Not Exist. All names are case sensitive'})
            } else {
                res.render('searched.pug', {data: user});
            }
        })
    }
})

module.exports = app;