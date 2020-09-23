require("dotenv").config()
const { create, getUserById, getUsers, deleteUser, updateUser, getUserByEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require("jsonwebtoken");
const crypto = require('crypto');
const { callbackify } = require('util');
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.body;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results,
                message: "User updated successfully"
            })

        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            return res.json({
                success: 1,
                data: results,
                message: "User deleted successfully"
            })
        })
    },
    login: (req, res) => {
        console.log(req.body)
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            console.log(err);
            console.log(results.password);
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid Email or Password"
                })
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.TOKEN_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login successful",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid Email or Password"
                })
            }

        })
    }

};