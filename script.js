//imports
import { createCategoryBackLink, fetchAndRenderCategory, fetchAndRenderLists } from "./modules/ui.js";
// import { fetchNews } from "./modules/news.js";

const fjoldiFretta = 5;
const main = document.querySelector("main");

function route() {
    let url = window.location;
    if (url.search != "") {
        fetchAndRenderCategory(url.search.substring(10),main,createCategoryBackLink(main,fjoldiFretta),fjoldiFretta)
    }
    else {
        fetchAndRenderLists(main,fjoldiFretta)
    }
}

window.onpopstate = () => {
    // skoða https://developer.mozilla.org/en-US/docs/Web/API/History_API
}

route();