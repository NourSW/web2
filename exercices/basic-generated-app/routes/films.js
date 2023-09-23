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
    link: 'https://www.google.com/search?q=vegeta&rlz=1C1SQJL_frTN932BE935&oq=vegeta&aqs=chrome..69i57j69i64j0i67i650j0i67i131i433i650j0i433i512l2j0i512j46i175i199i512.1752j0j15&sourceid=chrome&ie=UTF-8'
  },
  {
    id: 3,
    title: 'VEGETA 3',
    duration: 300,
    link: 'https://www.google.com/search?q=vegeta&rlz=1C1SQJL_frTN932BE935&oq=vegeta&aqs=chrome..69i57j69i64j0i67i650j0i67i131i433i650j0i433i512l2j0i512j46i175i199i512.1752j0j15&sourceid=chrome&ie=UTF-8'
  },
];



/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
  const orderByTitle =
    req?.query?.order?.includes('title') // ?? COMMENT FILTRER PAR DURATION ?? 
      ? req.query.order
      : undefined;
  let orderedMenu;
  console.log(`order by ${orderByTitle ?? 'not requested'}`);
  if (orderByTitle)
    orderedMenu = [...FILMS].sort((a, b) => a.title.localeCompare(b.title));
  if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();

  console.log('GET /pizzas');
  res.json(orderedMenu ?? FILMS);
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
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;



  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

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



module.exports = router;