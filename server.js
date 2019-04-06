const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://trial:trial@cluster0-jrjcl.mongodb.net/test?retryWrites=true";
const dbName = "savexpress";

app.listen(4000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('toDo').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result)
    res.render('index.ejs', {toDo: result})
  })
})

app.post('/toDo', (req, res) => {
  db.collection('toDo').save({toDoitem: req.body.toDoitem}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.delete('/toDo', (req, res) => {
  db.collection('toDo').findOneAndDelete({toDoitem: req.body.toDoitem}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
app.delete('/toDoall', (req, res) => {
  db.collection('toDo').remove({}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
