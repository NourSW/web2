const express = require('express');
const {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
} = require('../models/films');

const router = express.Router();

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const allPizzasPotentiallyOrdered = readAllFilms(req?.query
    ? Number(req.query['minimum-duration']): undefined);

  if (allPizzasPotentiallyOrdered === undefined)return res.sendStatus(400)


  return res.json(allPizzasPotentiallyOrdered);
});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  const foundPizza = readOneFilm(req.params.id);

  if (!foundPizza) return res.sendStatus(404);

  return res.json(foundPizza);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration =
  typeof req?.body?.duration !== 'number' || req.body.duration < 0
    ? undefined
    : req.body.duration;
  const budget =
  typeof req?.body?.budget !== 'number' || req.body.budget < 0
      ? undefined
      : req.body.budget; 
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;



  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'


  const createdPizza = createOneFilm(title, duration,budget,link);

  return res.json(createdPizza);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const deletedPizza = deleteOneFilm(req.params.id);

  if (!deletedPizza) return res.sendStatus(404);

  return res.json(deletedPizza);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /pizzas/${req.params.id}`);

  const title = req?.body?.title;
  const content = req?.body?.duration;

  if ((!title || !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);


  const updatedPizza = updateOneFilm(req.params.id, { title, content });

  if (!updatedPizza) return res.sendStatus(404);

  return res.json(updatedPizza);
});

// Update a pizza based on its id and new values for its parameters
router.put('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link; // ?? IL NYA RIEN DS LE CONTENT PK CA RETOURNE PAS UNE ERR RES.STATU400 ??
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  console.log('PUT');

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )return res.sendStatus(400);

  const updatedPizza = updateOneFilm(req.params.id, { title, link,duration,budget });

  if (!updatedPizza) return res.sendStatus(404);

  return res.json(updatedPizza);
});




module.exports = router;

