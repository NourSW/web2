const path = require('node:path');
const { serialize, parse } = require('../utils/json');


const jsonDbPath = path.join(__dirname, '/../data/films.json');


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
   GET /films?minimum-duration=value:ascending orderbytitle
   GET /pizzas?order=-title:descending orderbytitle
*/
function readAllFilms(orderBy){
const films = parse(jsonDbPath, FILMS);

const minimumFilmDuration = orderBy
if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
return undefined;
if (!minimumFilmDuration) return films;

const filmsReachingMinimumDuration = films.filter(
  (film) => film.duration >= minimumFilmDuration
);
return filmsReachingMinimumDuration;
};


// Read the pizza identified by an id in the menu
function readOneFilm(id){
  console.log(`GET /pizzas/${id}`);

  const films = parse(jsonDbPath, FILMS);


  const indexOfPizzaFound = films.findIndex((pizza) => pizza.id === Number(id));

  if (indexOfPizzaFound < 0) return undefined;

  return films[indexOfPizzaFound];
};

function getNextId() {
    const pizzas = parse(jsonDbPath, FILMS);
    const lastItemIndex = pizzas?.length !== 0 ? pizzas.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = pizzas[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
  }

// Create a pizza to be added to the menu.
function createOneFilm(title,duration,budget,link) {
  const films = parse(jsonDbPath, FILMS);


  const existingFilm = films.find((film) => film.title.toLowerCase() === title.toLowerCase())
  if(existingFilm)return undefined;
  
  
  const newFilm = {
    id: getNextId(),
    title,
    duration,
    budget,
    link
  };

  films.push(newFilm);

  serialize(jsonDbPath, films)

  return newFilm;
};

// Delete a pizza from the menu based on its id
function deleteOneFilm(id) {
        const idNumber = parseInt(id, 10);
        const pizzas = parse(jsonDbPath, FILMS);
        const foundIndex = pizzas.findIndex((pizza) => pizza.id === idNumber);
        if (foundIndex < 0) return undefined;
        const deletedPizzas = pizzas.splice(foundIndex, 1);
        const deletedPizza = deletedPizzas[0];
        serialize(jsonDbPath, pizzas);
      
        return deletedPizza;
};


// Update a pizza based on its id and new values for its parameters
function updateOneFilm(id, propertiesToUpdate) {
    const idNumber = parseInt(id, 10);
    const pizzas = parse(jsonDbPath, FILMS);
    const foundIndex = pizzas.findIndex((pizza) => pizza.id === idNumber);
    if (foundIndex < 0) return undefined;
  
    const updatedPizza = { ...pizzas[foundIndex], ...propertiesToUpdate };
  
    pizzas[foundIndex] = updatedPizza;
  
    serialize(jsonDbPath, pizzas);
  
    return updatedPizza;
  }

// Update a pizza based on its id and new values for its parameters
function put(id, propertiesToUpdate){
  const films = parse(jsonDbPath, FILMS);

  
  const foundIndex = films.findIndex(pizza => pizza.id === Number(id));

  if (foundIndex < 0){
    const newFilm = {id,...propertiesToUpdate};
    films.push(newFilm);
    return newFilm; 

  } 

  const updatedPizza = {...films[foundIndex], ...propertiesToUpdate};

  films[foundIndex] = updatedPizza;

  serialize(jsonDbPath, films)

  return updatedPizza;
};

module.exports = {
    readAllFilms,
    readOneFilm,
    put,
    updateOneFilm,
    createOneFilm,
    deleteOneFilm,
  };
  