const express = require('express');
const router = express.Router();

const heroes = [
  {
    id: 1,
    alias: 'batman',
    abilities: 'money',
    realName: 'Bruce wayne',
    antagonist: 'joker'
  },
  {
    id: 2,
    alias: 'superman',
    abilities: 'todos',
    realName: 'Khal el',
    antagonist: 'Luthor'
  },
  {
    id: 3,
    alias: 'Green lanter',
    abilities: 'a ring?',
    realName: 'no se',
    antagonist: 'el color amarillo'
  },
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('heroes/list', {heroes});
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const filterHeroes = heroes.filter(hero => hero.id == id);
  filterHeroes.length > 0 ?
    res.render('heroes/hero', {hero: filterHeroes[0]}) :
    res.status(404).json({msg: 'not found'});
});

router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  const filterHeroes = heroes.filter(hero => hero.id == id);
  filterHeroes.length > 0 ?
    res.render('heroes/edit', {hero: filterHeroes[0]}) :
    res.status(404).json({msg: 'not found'});
});

router.post('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  for (const index in heroes) {
    if (heroes[index].id == id) {
      heroes[index] = req.body;
      break;
    }
  }
  res.redirect('../'+id);
});
router.put('/:id', function(req, res, next) {
  const id = req.params.id;
  for (const index in heroes) {
    if (heroes[index].id == id) {
      heroes[index] = req.body;
      res.json(req.body);
      return null;
    }
  }
  res.status(404).json({msg: 'not found'});
});

router.get('/:id/remove', function(req, res, next) {
  const id = req.params.id;
  for (const index in heroes) {
    const hero = heroes[index];
    if (hero.id == id) {
      heroes.splice(index, 1); //elimina del array
      res.redirect('../')
      return null;
    }
  }
  res.status(404).json({msg: 'not found'});
});


function verifyToken(req, res, next) {
  next();
}
module.exports = router;
