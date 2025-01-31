import Steph from "/public/cards/curry.png";
import Butler from "/public/cards/butler.png";
import ButlerNcaa from "/public/cards/butler-ncaa.png";
import CurryNcaa from "/public/cards/curry-ncaa.png";
import Bron from "/public/cards/lebron.png";
import Rudy from "/public/cards/rudy.png";
import NcaaRose from "/public/cards/ncaa-rose.png";
import EuroMikeJames from "/public/cards/mjames.jpg";
import JaPoster from "/public/cards/jaPoster.jpg";
import JaCard from "/public/cards/jaCard.png";

const data = [
  {
    id: 0,
    name: "Stephen Curry",
    team: "Golden State Warriors",
    number: 30,
    image: Steph,
    pack: "nba",
    variant: "regular",
  },
  {
    id: 1,
    name: "Jimmy Butler",
    team: "Miami Heat",
    number: 22,
    image: Butler,
    pack: "nba",
    variant: "regular",
  },
  {
    id: 2,
    name: "Jimmy Butler",
    team: "Maqrquette",
    number: 33,
    image: ButlerNcaa,
    pack: "ncaa",
    variant: "regular",
  },
  {
    id: 3,
    name: "Stephen Curry",
    team: "Davidson",
    number: 30,
    pack: "ncaa",
    image: CurryNcaa,
    variant: "regular",
  },
  {
    id: 4,
    name: "Lebron James",
    team: "Los Angeles Lakers",
    number: 23,
    pack: "nba",
    image: Bron,
    variant: "regular",
  },
  {
    id: 5,
    name: "Rudy Fernandez",
    team: "DKV",
    number: 22,
    pack: "euro",
    image: Rudy,
    variant: "regular",
  },
  {
    id: 6,
    name: "Derrick rose",
    team: "Memphis university",
    number: 23,
    pack: "ncaa",
    image: NcaaRose,
    variant: "regular",
  },
  {
    id: 7,
    name: "Mike James",
    team: "Monaco CB",
    number: 55,
    pack: "euro",
    image: EuroMikeJames,
    variant: "regular",
  },
  {
    id: 8,
    name: "Ja Morant",
    team: "Memphis grizzlies",
    number: 55,
    pack: "nba",
    image: JaPoster,
    variant: "poster",
  },

  {
    id: 9,
    name: "Ja Morant",
    team: "Memphis grizzlies",
    number: 55,
    pack: "nba",
    image: JaCard,
    variant: "regular",
  },
];
export default data;
