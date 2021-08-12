require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const methodOverride = require('method-override')
const comments = require('./models/comments.js')
const { models} = require('./models/models.js');



app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static("public"));

app.get('/', async (req, res) => {
    const bookmarks = await models.Bookmarks.findAll({
        order:['id']
    })
    res.render('index.ejs',{
        bookmark: bookmarks,
    })
})

app.post('/', async (req, res) => {
    await models.Bookmarks.create({
        url: req.body.url
    })
    res.redirect('/')
})

app.delete('/:id', async (req, res) => {
    await models.Bookmarks.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    res.render('update.ejs', {
        id: req.params.id
    })
})

app.put('/edit/:id', async (req, res) =>{

    await models.Bookmarks.update({
        url: req.body.url},
        {where: {id: req.params.id}
    })
    res.redirect('/')
})

app.get('/bookmarks/:id', async (req, res) => {
    const commentUrl = await models.Bookmarks.findAll({
        where: {
            id: req.params.id}
        })
    const comments = await models.Comments.findAll({})
    res.render('bookmarks.ejs', {
        id: req.params.id,
        url: commentUrl,
        comments: comments,
        bookmark: commentUrl
    })
})

app.post('/comments/:id', async (req, res) => {
    let id = req.params.id
    const comments = await models.Comments.create({ comment: req.body.comments, bookmarkId: id})
    res.redirect(`/bookmarks/${id}`)
})

app.delete('/comments/:id', async (req, res) => {
    let id = req.params.id
    await models.Comments.destroy({
        where: {
            id: id,
        } 
    })
    res.redirect(`/bookmarks/${req.body.bookmarkId}`)
})

app.post('/edit-comment/:id', async(req, res) =>{
    const commentUrl = await models.Bookmarks.findAll({
        where: {
            id: req.body.bookmarkId}
        })
    const comments = await models.Comments.findAll({
        where: {
            id: req.params.id
        }
    })
    res.render('comments.ejs', {
        id: req.params.id, 
        url: commentUrl,
        comments: comments,
        bookmarkId: req.body.bookmarkId
    })
})

app.put('/edit-comment/:id', async (req, res) =>{
    await models.Comments.update({
        comment: req.body.comments
        },
        {where: {id: req.params.id}   
        })
    res.redirect(`/bookmarks/${req.body.bookmarkId}`);
});

// app.get('/:id', async (req, res) => {
//     const tags = await models.Tags.findAll({
//         order:['id']
//     })
//     res.render('index.ejs',{
//         tags: tags
//     })
// })

// app.post('/:id', async (req, res) => {
//     await models.Tags.create({
//         tag: req.body.tag
//     })
//     res.redirect('/')
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })