// imports
import { empty } from './modules/helpers.js';
import {
  createCategoryBackLink,
  fetchAndRenderCategory,
  fetchAndRenderLists,
} from './modules/ui.js';
// import { fetchNews } from "./modules/news.js";

const fjoldiFretta = 5;
const main = document.querySelector('main');

function route() {
  const url = window.location;
  if (url.search !== '') {
    fetchAndRenderCategory(
      url.search.substring(10),
      main,
      createCategoryBackLink(main, fjoldiFretta),
      20,
      true
    );
  } else {
    fetchAndRenderLists(main, fjoldiFretta);
  }
}

window.onpopstate = () => {
  empty(main);
  route();
};

route();
