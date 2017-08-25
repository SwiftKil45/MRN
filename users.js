var express = require('express');
var router = express.Router();
var db = require('./data.json');

router.route('/')
    //returns all users and their data
    .get(function (req, res) {
        res.json(db.users);
    })
    //adds new user
    .post(function (req, res){
        var newUser = {
            birthday: req.body.birthday,
            email: req.body.email,
            favoriteColor: req.body.color,
            id: req.body.id,
            image: req.body.image,
            joinDate: req.body.joinDate,
            name: req.body.name,
            username: req.body.username
        }
        db.users.push(newUser);
        res.send('Added new user');
    })
    .put(function (req, res) {
        var newUser = {
            birthday: req.body.birthday,
            email: req.body.email,
            favoriteColor: req.body.color,
            id: req.body.id,
            image: req.body.image,
            joinDate: req.body.joinDate,
            name: req.body.name,
            username: req.body.username
        }
        for(var i=0; i<db.users.length; i++){
            var found = false;
            if(db.users[i].username == req.body.username){
                db.users[i] = newUser;
                found = true;
                res.send('Updated User');
            }
        }
        if(!found)
            res.send('User does not exist');
    });

router.route('/:username')
    .get(function (req, res) {
        var found = false;
        for(var i=0; i<db.users.length; i++){
            if(db.users[i].username == req.params.username){
                res.json(db.users[i]);
                found = true;
            }
        }
        if(!found)
            res.send("User not found");
    })
    .put(function (req, res) {
        var found = false;
        for(var i=0; i<db.users.length; i++){
            if(db.users[i].username == req.params.username){
                db.users[i].favoriteColor = req.body.color;
                res.send('User color was updated');
                found = true;
            }
        }
        if(!found)
            res.send('Username not found');
    })
    .delete(function (req, res) {
        var found = false;
        for(var i=0; i<db.users.length; i++){
            if(db.users[i].username == req.params.username){
                db.users.splice(i,1);
                res.send('Deleted user');
                found = true;
            }
        }
        if(!found)
            res.send('Username not found');
    });

module.exports = router;