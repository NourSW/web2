var express = require('express');
var router = express.Router();

const FILMS = [
  {
    id: 1,
    title: 'IRON-MAN',
    duration: 60,
    budget: 100,
    link: 'https://www.google.com/search?q=vegeta&rlz=1C1SQJL_frTN932BE935&oq=vegeta&aqs=chrome..69i57j69i64j0i67i650j0i67i131i433i650j0i433i512l2j0i512j46i175i199i512.1752j0j15&sourceid=chrome&ie=UTF-8'
  },
  {
    id: 2,
    title: 'SPIEDER-MAN 2',
    duration: 200,
    budget: 200,
    link: 'https://www.google.com/search?q=vegeta&rlz=1C1SQJL_frTN932BE935&oq=vegeta&aqs=chrome..69i57j69i64j0i67i650j0i67i131i433i650j0i433i512l2j0i512j46i175i199i512.1752j0j15&sourceid=chrome&ie=UTF-8'
  },
  {
    id: 3,
    title: 'VEGETA 3',
    duration: 300,
    budget: 300,
    link: 'https://www.google.com/search?q=vegeta&rlz=1C1SQJL_frTN932BE935&oq=vegeta&aqs=chrome..69i57j69i64j0i67i650j0i67i131i433i650j0i433i512l2j0i512j46i175i199i512.1752j0j15&sourceid=chrome&ie=UTF-8'
  },
];



/* Read all the pizzas from the menu
   GET /films?minimum-duration=value : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
  const minimumFilmDuration = req?.query
  ? Number(req.query['minimum-duration'])
  : undefined;
if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
return res.sendStatus(400);
if (!minimumFilmDuration) return res.json(FILMS);

const filmsReachingMinimumDuration = FILMS.filter(
  (film) => film.duration >= minimumFilmDuration
);
return res.json(filmsReachingMinimumDuration);

});


// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  console.log(`GET /pizzas/${req.params.id}`);

  const indexOfPizzaFound = FILMS.findIndex((pizza) => pizza.id == req.params.id);

  if (indexOfPizzaFound < 0) return res.sendStatus(404);

  res.json(FILMS[indexOfPizzaFound]);
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

  const existingFilm = FILMS.find((film) => film.title.toLowerCase() === title.toLowerCase())
  if(existingFilm)return res.sendStatus(409);
  
  const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  
  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link
  };

  FILMS.push(newFilm);

  res.json(newFilm);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /pizzas/${req.params.id}`);

  const foundIndex = FILMS.findIndex(pizza => pizza.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = FILMS.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /pizzas/${req.params.id}`);

  const title = req?.body?.title;
  const content = req?.body?.duration;

  console.log('POST /pizzas');

  if ((!title || !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);

  const foundIndex = FILMS.findIndex(pizza => pizza.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = {...FILMS[foundIndex], ...req.body};

  FILMS[foundIndex] = updatedPizza;

  res.json(updatedPizza);
});

// Update a pizza based on its id and new values for its parameters
router.put('/:id', (req, res) => {
  console.log(`Put /pizzas/${req.params.id}`);

  const title = req?.body?.title;
  const link = req?.body?.link; // ?? IL NYA RIEN DS LE CONTENT PK CA RETOURNE PAS UNE ERR RES.STATU400 ??
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  console.log('POST /pizzas');

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

  const id = req.params.id;
  const foundIndex = FILMS.findIndex(pizza => pizza.id == id);

  if (foundIndex < 0){
    const newFilm = {id,title,link,duration,budget};
    FILMS.push(newFilm);
    return res.json(newFilm); 

  } 

  const updatedPizza = {...FILMS[foundIndex], ...req.body};

  FILMS[foundIndex] = updatedPizza;

  res.json(updatedPizza);
});




module.exports = router;