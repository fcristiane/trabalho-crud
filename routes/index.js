var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 global.db.findAll((e,docs)=> {
   if(e) {
     return console.log(e);}
     res.render('index', { title: 'Lista de usuários', docs: docs});
 })
});


router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"","idade":""}, action: '/new' });
});


router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var idade = parseInt(req.body.idade);
  global.db.insert({nome, idade}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Usuário', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
})


module.exports = router;
