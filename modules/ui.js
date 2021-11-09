import { el, empty } from './helpers.js';
import { fetchNews } from './news.js';

/**
 * @param {HTMLElement} container Element sem á að birta fréttirnar í
 * @param {number} newsItemLimit Hámark frétta sem á að birta
 * @returns {function} Fall sem bundið er við click event á link/takka
 */
function handleBackClick(container, newsItemLimit) {
  return (e) => {
    e.preventDefault();
    window.history.replaceState(null, null, '/');
    empty(container);
    // location.replace("/")
    fetchAndRenderLists(container, newsItemLimit);
  };
}

/**
 * @param {string} id ID á flokk sem birta á eftir að smellt er
 * @param {HTMLElement} container Element sem á að birta fréttirnar í
 * @param {number} newsItemLimit Hámark frétta sem á að birta
 * @returns {function} Fall sem bundið er við click event á link/takka
 */
function handleCategoryClick(id, container, newsItemLimit) {
  return (e) => {
    e.preventDefault();

    // TODO útfæra
    window.history.pushState(null, null, `?category=${id}`);
    empty(container);
    // location.replace("/?category=" + id)
    fetchAndRenderCategory(
      id,
      container,
      createCategoryBackLink(container, newsItemLimit),
      20,
      true
    );
  };
}

/**
 * @param {HTMLElement} container Element sem á að birta fréttirnar í
 * @param {number} newsItemLimit Hámark frétta sem á að birta
 * @returns {HTMLElement} Element með takka sem fer á forsíðu
 */
export function createCategoryBackLink(container, newsItemLimit) {
  const takki = el('a', 'Til baka');
  takki.setAttribute('href', '/');
  takki.setAttribute('class', 'takki');
  takki.addEventListener('click', handleBackClick(container, newsItemLimit));
  return takki;
}

/**
 * @param {HTMLElement} container Element sem mun innihalda allar fréttir
 * @param {number} newsItemLimit Hámark fjöldi frétta sem á að birta í yfirliti
 */
export async function fetchAndRenderLists(container, newsItemLimit) {
  const loadAllt = el('p', 'Sæki fréttir...');
  loadAllt.setAttribute('id', 'loadAllt');
  container.appendChild(loadAllt);

  fetchNews()
    .then((data) => {
      empty(container);
      if (data === null) {
        container.appendChild(
          el('p', 'Villa kom við að sækja gögn, reyni aftur, augnablik...')
        );
        fetchAndRenderLists(container, newsItemLimit);
        return;
      }
      for (const item of data) {
        const link = el('a', 'Skoða meira');
        link.setAttribute('href', `/?category=${item.id}`);
        link.setAttribute('class', 'takki');

        link.addEventListener(
          'click',
          handleCategoryClick(item.id, container, newsItemLimit)
        );
        fetchAndRenderCategory(item.id, container, link, newsItemLimit);
      }
    })

    .catch((error) => {
      console.error(error);
    });
}

/**
 * @param {string} id ID á category sem við erum að sækja
 * @param {HTMLElement} parent Element sem setja á flokkinn í
 * @param {HTMLELement | null} [link=null] Linkur sem á að setja eftir fréttum
 * @param {number} [limit=Infinity] Hámarks fjöldi frétta til að sýna
 */
export async function fetchAndRenderCategory(
  id,
  parent,
  link = null,
  limit = 20,
  single = false
) {
  const section = el('section', el('p', 'Sæki gögn...'));
  if (single) section.setAttribute('class', 'stor');
  parent.appendChild(section);
  fetchNews(id)
    .then((data) => {
      empty(section);
      if (data === null) {
        section.appendChild(el('p', 'Villa kom upp!'));
        return;
      }
      section.appendChild(el('h1', data.title));
      for (let i = 0; i < limit; i++) {
        const frettLinkur = el('a', data.items[i].title);
        frettLinkur.setAttribute('href', data.items[i].link);
        section.appendChild(frettLinkur);
      }
      section.appendChild(link);
    })
    .catch((error) => {
      empty(parent);
      console.error(error);
    });
}
