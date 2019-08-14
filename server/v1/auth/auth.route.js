const express = require("express");
const authCtrl = require("./auth.controller");
const router = express.Router();

router.param('user',function(req,res,next,value,name){
    // console.log("req res next value name",req)
})

router.use(function(req,res,next){
    next();
    // console.log("Req Res form post",req,res);
})

router.route('/login')
    .post(function(obj){
        console.log("obj",obj)
    })

module.exports = router;