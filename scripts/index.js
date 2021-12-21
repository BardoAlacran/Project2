const mongoose = require('mongoose');
const Game = require('../models/game');

const games = [
  {
    name: 'Monopoly',
    year: 1935,
    rating: 3,
    description: 'Monopoly is a multi-player economics-themed board game. In the game, players roll two dice to move around the game board, buying and trading properties, and developing them with houses and hotels. Monopoly is a multi-player economics-themed board game. In the game, players roll two dice to move around the game board, buying and trading properties, and developing them with houses and hotels.',
    image: 'https://i.etsystatic.com/16410581/r/il/7237a7/3332335512/il_794xN.3332335512_s36l.jpg',
    numOfPlayers: '2 - 8',
    playingTime: '180 minutes',
    difficulty: 'easy'
  },
  {
    name: 'Catan',
    year: 1995,
    rating: 3,
    description: 'In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep.',
    image: 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__itemrep/img/IzYEUm_gWFuRFOL8gQYqGm5gU6A=/fit-in/246x300/filters:strip_icc()/pic2419375.jpg ',
    numOfPlayers: '3 - 4',
    playingTime: '120 minutes',
    difficulty: 'medium'
  },
  {name: 'Risk',
    year: 1959,
    rating: 4,
    description: 'Possibly the most popular, mass market war game. The goal is conquest of the world. Each player turn consists of gaining reinforcements through number of territories held, control of every territory on each continent, and turning sets of bonus cards. Attacking other players using a simple combat rule of comparing the highest dice rolled for each side. Players may attack as often as desired. If one enemy territory is successfully taken, the player is awarded with a bonus card. Moving a group of armies to another adjacent territory',
    image: 'https://cf.geekdo-images.com/Oem1TTtSgxOghRFCoyWRPw__imagepage/img/4wrkUvOM1FWJ6PAlG0C-LbeQ984=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4916782.jpg ',
    numOfPlayers: '2 - 6',
    playingTime: '120 minutes',
    difficulty: 'easy'
  },
  {name: '',
    year: 1995,
    rating: 4,
    description: '',
    image: '',
    numOfPlayers: '',
    playingTime: '',
    difficulty: ''
  },
  {name: '',
    year: 1995,
    rating: 4,
    description: '',
    image: '',
    numOfPlayers: '',
    playingTime: '',
    difficulty: ''
  }

  
];

mongoose
  .connect('mongodb://localhost:27017/course-db')
  .then(() => {
    return Course.deleteMany({});
  })
  .then(() => {
    return Course.insertMany(courses);
  })
  .then(courses => {
    console.log(`${courses.length} cursos insertados con exito`);
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('conection closed');
  });
