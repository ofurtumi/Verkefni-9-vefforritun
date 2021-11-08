//imports
import { fetchNews } from "./modules/news.js";

const fjoldiFretta = 5;
const main = document.querySelector("main");
let test

function route() {
    let url = window.location;
    if (url.search != "") {
        fetchNews(url.search.substring(10))
    }
    else {
        test = fetchNews(url.pathname)
    }
}

window.onpopstate = () => {
    // skoða https://developer.mozilla.org/en-US/docs/Web/API/History_API
}

route();

document.querySelector("#testbutton").addEventListener("click",(e) => {
    console.log("test")
    fetch('https://vef2-2021-ruv-rss-json-proxy.herokuapp.com/innlent')
        .then((result) => {
            if (!result.ok) {
            throw new Error('Non 200 status');
            }
            return result.json();
        })
        .then(data => console.log(data.items[0].body))
        .catch(error => console.error(error));
  });