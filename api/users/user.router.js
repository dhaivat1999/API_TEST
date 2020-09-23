const { createUser,getUserById,getUsers,updateUser,deleteUser,login } = require('./user.controller')
const router = require("express").Router();
const {checkToken} =require("../../auth/token_validation")
/**
use the routes mentioned below when we want to add authentication to the APIs with the help of jwt tokens
 */
// router.post("/",checkToken,createUser);
// router.get("/",checkToken,getUsers);
// router.get("/getUsersById",checkToken,getUserById);
// router.patch("/",checkToken,updateUser);
// router.delete("/",checkToken,deleteUser)

router.post("/",createUser);
router.get("/",getUsers);
router.post("/getUsersById",getUserById);
router.patch("/",updateUser);
router.delete("/",deleteUser)
router.post("/login",login);
module.exports = router