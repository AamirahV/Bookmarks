require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const {models} = require('./models');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.get('/bookmark', async (req, res) => {
  const bookmarks = await models.Bookmark.findAll({})

  res.render('index.ejs', {
    bookmarks: bookmarks

  });
})

app.post('/bookmark', async (req, res) => {
  await models.Bookmark.create(
        {
          url: req.body.url,
          description: req.body.desc,
          name: req.body.name
        }
      )

  res.redirect('/bookmark');
})

app.delete('/bookmark/:id', async (req, res) => {
  await models.Bookmark.destroy({
    where: {
      id: req.params.id
    }
  })

  res.redirect('/bookmark')

})

app.put('/update/:id', async (req, res) => {
  await models.Bookmark.update({
      url: req.body.url,
      description: req.body.desc,
      name: req.body.name
    },
    {where: {
      id: req.params.id
    }
  })

  res.redirect('/bookmark');
})

app.get('/update/:id', async (req, res) => {
  res.render('update.ejs', {
    id: req.params.id
  });
})

app.listen(port, () => {
  console.log("running");
})
