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
import AnthonyEdwards from "/public/cards/ant.png";
import RudyInter from "/public/cards/rudyinter.jpg";
import history from "/public/cards/history.png";
import icon from "/public/cards/icon.png";
import duo from "/public/cards/duo.png";
import international from "/public/cards/international.png";
import mvp from "/public/cards/mvp.png";
import rookie from "/public/cards/roy.png";
import poster from "/public/cards/poster.png";
import dposter from "/public/cards/rose/poster.png";
import dmvp from "/public/cards/rose/mvp.png";
import drookie from "/public/cards/rose/roy.png";
import dduo from "/public/cards/rose/duo.png";
import dspot from "/public/cards/rose/spotlight.png";
import dinternational from "/public/cards/rose/international.png";
import dicon from "/public/cards/rose/iconic.png";
import dregular from "/public/cards/rose/regular.png";

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
  {
    id: 10,
    name: "Anthony Edwards",
    team: "Minnesota Timberwolves",
    number: 1,
    pack: "nba",
    image: AnthonyEdwards,
    variant: "regular",
  },
  {
    id: 11,
    name: "Lebron James",
    team: "Los Angeles Lakers",
    number: 23,
    pack: "nba",
    image: history,
    variant: "history",
  },
  {
    id: 12,
    name: "Lebron James",
    team: "Los Angeles Lakers",
    number: 23,
    pack: "nba",
    image: rookie,
    variant: "rookie",
  },
  {
    id: 13,
    name: "Lebron James",
    team: "Los Angeles Lakers",
    number: 23,
    pack: "nba",
    image: icon,
    variant: "icon",
  },
  {
    id: 14,
    name: "Lebron James",
    team: "Los Angeles Lakers",
    number: 23,
    pack: "nba",
    image: international,
    variant: "international",
  },
  {
    id: 15,
    name: "Lebron James",
    team: "Los Angeles Lakers",
    number: 23,
    pack: "nba",
    image: mvp,
    variant: "mvp",
  },
  {
    id: 16,
    name: "Lebron James",
    team: "Los Angeles Lakers",
    number: 23,
    pack: "nba",
    image: poster,
    variant: "poster",
  },
  {
    id: 17,
    name: "Lebron James",
    team: "Miami Heat",
    number: 23,
    pack: "nba",
    image: duo,
    variant: "duo",
  },
  {
    id: 18,
    name: "Rudy Fernandez",
    team: "DKV",
    number: 22,
    pack: "euro",
    image: RudyInter,
    variant: "international",
  },
  {
    id: 19,
    name: "Derrick Rose",
    team: "chicago bulls",
    number: 1,
    pack: "nba",
    image: dregular,
    variant: "regular",
  },
  {
    id: 20,
    name: "Derrick Rose",
    team: "chicago bulls",
    number: 1,
    pack: "nba",
    image: dspot,
    variant: "spotlight",
  },
  {
    id: 21,
    name: "Derrick Rose",
    team: "chicago bulls",
    number: 22,
    pack: "nba",
    image: dduo,
    variant: "duo",
  },
  {
    id: 22,
    name: "Derrick Rose",
    team: "chicago bulls",
    number: 22,
    pack: "nba",
    image: dicon,
    variant: "iconic",
  },
  {
    id: 23,
    name: "Derrick Rose",
    team: "chicago bulls",
    number: 22,
    pack: "nba",
    image: dinternational,
    variant: "international",
  },
  {
    id: 24,
    name: "Derrick Rose",
    team: "chicago bulls",
    number: 22,
    pack: "nba",
    image: dmvp,
    variant: "mvp",
  },
  {
    id: 25,
    name: "Derrick Rose",
    team: "chicago bulls",
    number: 22,
    pack: "nba",
    image: drookie,
    variant: "rookie",
  },

  {
    id: 26,
    name: "Derrick Rose",
    team: "chicago bulls",
    number: 1,
    pack: "nba",
    image: dposter,
    variant: "poster",
  },
];
export default data;
