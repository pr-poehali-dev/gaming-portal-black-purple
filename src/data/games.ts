export type Genre =
  | 'Все'
  | 'Экшен'
  | 'Зомби-выживание'
  | 'Сюжеты'
  | 'Фантастика'
  | 'Космос'
  | 'Хоррор'
  | 'Приключения'
  | 'Стратегические'
  | 'Файтинг'
  | 'Головоломка'
  | 'Аркада'
  | 'Стелс'
  | 'Гонки'
  | 'Гоночная игра'
  | 'Песочница';

export const GENRES: Genre[] = [
  'Все', 'Экшен', 'Зомби-выживание', 'Сюжеты', 'Фантастика', 'Космос',
  'Хоррор', 'Приключения', 'Стратегические', 'Файтинг', 'Головоломка',
  'Аркада', 'Стелс', 'Гонки', 'Гоночная игра', 'Песочница'
];

export const GENRE_ICONS: Record<Genre, string> = {
  'Все': '🎮',
  'Экшен': '💥',
  'Зомби-выживание': '🧟',
  'Сюжеты': '📖',
  'Фантастика': '🚀',
  'Космос': '🌌',
  'Хоррор': '👻',
  'Приключения': '🗺️',
  'Стратегические': '♟️',
  'Файтинг': '🥊',
  'Головоломка': '🧩',
  'Аркада': '🕹️',
  'Стелс': '🕵️',
  'Гонки': '🏎️',
  'Гоночная игра': '🏁',
  'Песочница': '🏗️',
};

const ACTION_IMG = 'https://cdn.poehali.dev/projects/84e8edc0-9d46-4ffd-b9cf-b66c7f28cf91/files/9625c6e6-6c41-4f70-ab1b-a7d36e7c053b.jpg';
const ZOMBIE_IMG = 'https://cdn.poehali.dev/projects/84e8edc0-9d46-4ffd-b9cf-b66c7f28cf91/files/875b623e-9e47-4a66-a592-c8e1bebf6217.jpg';
const SPACE_IMG = 'https://cdn.poehali.dev/projects/84e8edc0-9d46-4ffd-b9cf-b66c7f28cf91/files/fbaecc51-8cd7-4514-b014-c01280b6758b.jpg';

export interface Game {
  id: number;
  title: string;
  genre: Genre;
  description: string;
  coverUrl: string;
  screenshots: string[];
  rating: number;
  votes: number;
  year: number;
  developer: string;
  publisher: string;
  platforms: string[];
  tags: string[];
}

export const GAMES: Game[] = [
  {
    id: 1,
    title: 'Doom Eternal',
    genre: 'Экшен',
    description: 'Стремительный шутер — убивай демонов с невероятной скоростью и мастерством. Ад вторгся на Землю, и только ты можешь остановить армию тьмы. Постоянное движение, зрелищный бой, метал-саундтрек.',
    coverUrl: ACTION_IMG,
    screenshots: [ACTION_IMG, ZOMBIE_IMG],
    rating: 9.2,
    votes: 4821,
    year: 2020,
    developer: 'id Software',
    publisher: 'Bethesda',
    platforms: ['PC', 'PS5', 'Xbox'],
    tags: ['шутер', 'fast-paced', 'демоны'],
  },
  {
    id: 2,
    title: 'Dying Light 2',
    genre: 'Зомби-выживание',
    description: 'Паркур-экшен в постапокалиптическом мире. Исследуй огромный открытый мир, выживай среди орд зомби и принимай судьбоносные решения, которые меняют город.',
    coverUrl: ZOMBIE_IMG,
    screenshots: [ZOMBIE_IMG, ACTION_IMG],
    rating: 8.4,
    votes: 3102,
    year: 2022,
    developer: 'Techland',
    publisher: 'Techland',
    platforms: ['PC', 'PS5', 'Xbox'],
    tags: ['паркур', 'открытый мир', 'кооп'],
  },
  {
    id: 3,
    title: 'The Last of Us Part II',
    genre: 'Сюжеты',
    description: 'Эмоциональное путешествие мести и искупления. Один из самых глубоких и трогательных нарративов в истории игр — история Элли, потери и выживания в жестоком мире.',
    coverUrl: ZOMBIE_IMG,
    screenshots: [ZOMBIE_IMG, SPACE_IMG],
    rating: 9.5,
    votes: 8920,
    year: 2020,
    developer: 'Naughty Dog',
    publisher: 'Sony',
    platforms: ['PS4', 'PS5'],
    tags: ['нарратив', 'выживание', 'драма'],
  },
  {
    id: 4,
    title: 'Mass Effect Legendary',
    genre: 'Фантастика',
    description: 'Эпическая трилогия о командоре Шепарде и спасении галактики. Миллионы выборов, сотни часов истории — твои решения меняют судьбу всей цивилизации.',
    coverUrl: SPACE_IMG,
    screenshots: [SPACE_IMG, ACTION_IMG],
    rating: 9.4,
    votes: 6700,
    year: 2021,
    developer: 'BioWare',
    publisher: 'EA',
    platforms: ['PC', 'PS4', 'Xbox'],
    tags: ['RPG', 'галактика', 'выборы'],
  },
  {
    id: 5,
    title: "No Man's Sky",
    genre: 'Космос',
    description: 'Бесконечная вселенная для исследования — 18 квинтиллионов планет ждут тебя. Строй базы, торгуй, выживай и исследуй в одном из крупнейших игровых миров.',
    coverUrl: SPACE_IMG,
    screenshots: [SPACE_IMG, ZOMBIE_IMG],
    rating: 8.7,
    votes: 5430,
    year: 2016,
    developer: 'Hello Games',
    publisher: 'Hello Games',
    platforms: ['PC', 'PS4', 'Xbox'],
    tags: ['исследование', 'выживание', 'процедурная генерация'],
  },
  {
    id: 6,
    title: 'Resident Evil Village',
    genre: 'Хоррор',
    description: 'Этан Уинтерс попадает в загадочную деревню, наполненную жуткими существами. Атмосфера страха, тайна замка и незабываемые враги на каждом шагу.',
    coverUrl: ZOMBIE_IMG,
    screenshots: [ZOMBIE_IMG, ACTION_IMG],
    rating: 9.0,
    votes: 7210,
    year: 2021,
    developer: 'Capcom',
    publisher: 'Capcom',
    platforms: ['PC', 'PS5', 'Xbox'],
    tags: ['выживание', 'от первого лица', 'атмосфера'],
  },
  {
    id: 7,
    title: 'Red Dead Redemption 2',
    genre: 'Приключения',
    description: 'Открытый мир Дикого Запада — невероятная детализация, живые NPC, эпическая история банды Ван дер Линде. Один из лучших открытых миров всех времён.',
    coverUrl: ACTION_IMG,
    screenshots: [ACTION_IMG, SPACE_IMG],
    rating: 9.8,
    votes: 15300,
    year: 2018,
    developer: 'Rockstar',
    publisher: 'Rockstar',
    platforms: ['PC', 'PS4', 'Xbox'],
    tags: ['открытый мир', 'вестерн', 'RPG'],
  },
  {
    id: 8,
    title: 'Civilization VI',
    genre: 'Стратегические',
    description: 'Построй великую цивилизацию с нуля — от каменного века до космической эры. Тысячи часов тактической глубины, дипломатия и войны.',
    coverUrl: ACTION_IMG,
    screenshots: [ACTION_IMG, ZOMBIE_IMG],
    rating: 9.1,
    votes: 9870,
    year: 2016,
    developer: 'Firaxis',
    publisher: '2K',
    platforms: ['PC', 'iOS'],
    tags: ['пошаговая', 'строительство', 'дипломатия'],
  },
  {
    id: 9,
    title: 'Mortal Kombat 11',
    genre: 'Файтинг',
    description: 'Жестокие и зрелищные поединки с богатым ростером персонажей. Глубокая боевая механика, захватывающий сюжет и кастомизация бойцов.',
    coverUrl: ACTION_IMG,
    screenshots: [ACTION_IMG, SPACE_IMG],
    rating: 8.8,
    votes: 6100,
    year: 2019,
    developer: 'NetherRealm',
    publisher: 'WB Games',
    platforms: ['PC', 'PS4', 'Xbox', 'Switch'],
    tags: ['PvP', 'жестокость', 'комбо'],
  },
  {
    id: 10,
    title: 'Portal 2',
    genre: 'Головоломка',
    description: 'Гениальные пространственные головоломки с порталами. Легендарный кооперативный режим и невероятное чувство юмора GLaDOS делают Portal 2 шедевром жанра.',
    coverUrl: SPACE_IMG,
    screenshots: [SPACE_IMG, ZOMBIE_IMG],
    rating: 9.9,
    votes: 21500,
    year: 2011,
    developer: 'Valve',
    publisher: 'Valve',
    platforms: ['PC', 'PS3', 'Xbox 360'],
    tags: ['кооп', 'физика', 'юмор'],
  },
  {
    id: 11,
    title: 'Sonic Frontiers',
    genre: 'Аркада',
    description: 'Соник в открытом мире — высокоскоростные забеги по острову Стар Фолл. Новый взгляд на классическую аркадную механику с открытым миром.',
    coverUrl: SPACE_IMG,
    screenshots: [SPACE_IMG, ACTION_IMG],
    rating: 7.5,
    votes: 2300,
    year: 2022,
    developer: 'Sonic Team',
    publisher: 'Sega',
    platforms: ['PC', 'PS4', 'Xbox', 'Switch'],
    tags: ['скорость', 'открытый мир', 'платформер'],
  },
  {
    id: 12,
    title: 'Dishonored 2',
    genre: 'Стелс',
    description: 'Мастерски продуманный стелс в фантастическом стимпанк-мире. Многовариантное прохождение — каждая миссия решаема десятком способов.',
    coverUrl: ZOMBIE_IMG,
    screenshots: [ZOMBIE_IMG, SPACE_IMG],
    rating: 9.0,
    votes: 5420,
    year: 2016,
    developer: 'Arkane',
    publisher: 'Bethesda',
    platforms: ['PC', 'PS4', 'Xbox'],
    tags: ['невидимка', 'магия', 'стимпанк'],
  },
  {
    id: 13,
    title: 'Forza Horizon 5',
    genre: 'Гонки',
    description: 'Лучший автосимулятор в открытом мире — сотни машин, живая Мексика, невероятная графика и ощущение скорости. Гоночный рай для любителей авто.',
    coverUrl: ACTION_IMG,
    screenshots: [ACTION_IMG, SPACE_IMG],
    rating: 9.3,
    votes: 8840,
    year: 2021,
    developer: 'Playground Games',
    publisher: 'Xbox Game Studios',
    platforms: ['PC', 'Xbox'],
    tags: ['автомобили', 'открытый мир', 'мультиплеер'],
  },
  {
    id: 14,
    title: 'Need for Speed Heat',
    genre: 'Гоночная игра',
    description: 'Дневные легальные гонки и ночные нелегальные заезды в неоновом городе Палм-Сити. Тюнинг, полиция и чистый адреналин.',
    coverUrl: ACTION_IMG,
    screenshots: [ACTION_IMG, ZOMBIE_IMG],
    rating: 8.1,
    votes: 3700,
    year: 2019,
    developer: 'Ghost Games',
    publisher: 'EA',
    platforms: ['PC', 'PS4', 'Xbox'],
    tags: ['тюнинг', 'нелегальные гонки', 'неон'],
  },
  {
    id: 15,
    title: 'Minecraft',
    genre: 'Песочница',
    description: 'Легендарная игра-песочница без правил и ограничений. Строй, выживай, исследуй бесконечно генерируемые миры — один из самых продаваемых проектов в истории.',
    coverUrl: SPACE_IMG,
    screenshots: [SPACE_IMG, ZOMBIE_IMG],
    rating: 9.6,
    votes: 42000,
    year: 2011,
    developer: 'Mojang',
    publisher: 'Microsoft',
    platforms: ['PC', 'PS4', 'Xbox', 'Switch', 'Mobile'],
    tags: ['строительство', 'выживание', 'кооп'],
  },
];
