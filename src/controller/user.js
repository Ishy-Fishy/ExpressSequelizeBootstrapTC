"use strict";

var _ = require("lodash");
var model = require("../model");

exports.getAll = function (req, res) {
    model.User.findAll().then(function (users) {
        res.status(200).json(users);
    })
};

exports.create = function (req, res) {
    var data = req.body;
    model.User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        title: data.title,
        organizationId: data.organizationId
    }).then(function (user) {
        res.status(200).json(user);

    }).catch(function (error) {
        res.status(500).send(error);
    });
};

exports.delete = function (req, res) {
    model.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        res.status(200).json(user);
    });
};

exports.update = function (req, res) {
    model.User.findOne({where: {id: req.params.id}}).then(function (user) {
        if (!user) {
            res.status(404).json({error: "User not found!"});
        }
        else {
            if (data.firstName) {
                user.firstName = data.firstName;
            }
            if (data.lastName) {
                user.lastName = data.lastName;
            }
            if (data.title) {
                user.title = data.title;
            }
            if (data.organizationId) {
                user.organizationId = data.organizationId;
            }

            user.save().then(function (usr) {
                res.status(200).json(usr);
            })
        }
    });
};

exports.getUserOrgId = function (req, res) {
    model.User.findAll({where: {organizationId: req.params.id}}).then(function (users) {
        var title = req.query.title;
        if (!users) {
            res.status(418).json({error: "User is a teapot."}); // :^)
        }
        else {
            if (title === undefined) {
                res.status(200).json(users);
            }
            else {
                try {
                    var filtered = _.filter(users, x => x.title == title);
                    res.status(200).json(filtered);  //TODO: Implement non-strict search algorithm via finding all key value substrings that match 'title' ala sub = users.title.substring(0, req.query.title.length)
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    })
};