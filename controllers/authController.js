

const e = require('express');
const firebase=require("firebase/app");
const fb = require('../db');
var cookies = require("cookie-parser");

const loginRender=(req,res)=>{
    res.render('login.html');
}

const signout=(req,res)=>{
    res.clearCookie('token',{path:'/api',domain:'localhost'});
    res.clearCookie('userName',{path:'/api',domain:'localhost'});

    return res.redirect('/api/login');
}

module.exports = {
    loginRender,
    signout
}