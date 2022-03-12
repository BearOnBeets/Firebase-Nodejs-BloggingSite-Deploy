'use strict';

const e = require('express');
const firebase = require('../db').db;
const Blog = require('../models/blogs');
const firestore = firebase.firestore();


const createBlog=(req,res)=>{

    res.render('createblog.html');
}

const saveBlog = async(req, res, next) => {
    try {
        const data = req.body;
        var name=req.cookies['userName']
        data.createdby=name
        await firestore.collection('blogs').doc().set(data);
        return res.redirect('/api/blogs');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const allBlogs = async (req, res, next) => {
    try {
        let link=''
        let profile=''
        var name=req.cookies['userName']
        const blogs = await firestore.collection('blogs');
        const data = await blogs.get();
        const blogsArray = [];
        res.write('<body style="background-color:pink">')
        profile='/api/blog/'+name
        res.write('<h3>Current Logged In-User:</h3><a href='+'"'+profile+'"'+'>'+name+'</a>')
        res.write('<button style="width: 200px; margin-left:80%;"><a style="text-decoration: none;" href="/api/signout">Signout</a></button>')
        res.write('<h1>All Blogs!</h1>')
        res.write('<button style="width: 200px; margin-left:80%;"><a style="text-decoration: none;" href="/api/create">Create New Blog</a></button>')
        res.write('<div style="display:block;margin:5px;padding:5px">')
        if(data.empty) {
            res.write('<h1>No Blogs Found :(</h1>')
        }else {
            data.forEach(doc => {
                const blog = new Blog(
                    doc.id,
                    doc.data().title,
                    doc.data().description,
                    doc.data().createdby,
                    link='/api/blog/'+doc.data().createdby,
                    res.write('<h3>Title:</h3>'+doc.data().title+'<h3>Description:</h3>'+doc.data().description+'<h3>Created-By:</h3><a href='+'"'+link+'"'+'>'+doc.data().createdby+'</a>')

                );
                blogsArray.push(blog);
                res.write('<hr>')
            });
            res.end();
        }
    } catch (error) {
        res.write('error'+error)
        res.end()
    }
}

const getBlog = async (req, res, next) => {
    try {
        var name=req.cookies['userName']
        const createdby=req.params.createdby
        var profile=''
        const blogref = await firestore.collection("blogs");
        const snapshot = await blogref.where('createdby', '==', createdby).get();
        profile='/api/blog/'+name
        res.write('<body style="background-color:pink">')

        res.write('<h3>Current Logged In-User:</h3><a href='+'"'+profile+'"'+'>'+name+'</a>')
        res.write('<button style="width: 200px; margin-left:80%;"><a style="text-decoration: none;" href="/api/signout">Signout</a></button>')
        res.write('<h1>All Blogs by user:</h1>'+createdby)
        res.write('<button style="width: 200px; margin-left:80%;"><a style="text-decoration: none;" href="/api/blogs">All Blogs</a></button>')
        res.write('<div style="display:block;margin:5px;padding:5px">')
        if (snapshot.empty) {
            res.write('<h1>No Blogs Found :(</h1>')
          }  
          snapshot.forEach(doc => {
            res.write('<h3>Title:</h3>'+doc.data().title+'<h3>Description:</h3>'+doc.data().description+'<h3>Created-By:</h3>'+doc.data().createdby)
            res.write('<hr>')
          });
          res.end();        
    } catch (error) {
        res.write("Error"+error)
        res.end();
    }
}


module.exports = {
    saveBlog,
    createBlog,
    allBlogs,
    getBlog
}