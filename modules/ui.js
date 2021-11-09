/**
 * Föll sem sjá um að kalla í `fetchNews` og birta viðmót:
 * - Loading state meðan gögn eru sótt
 * - Villu state ef villa kemur upp við að sækja gögn
 * - Birta gögnin ef allt OK
 * Fyrir gögnin eru líka búnir til takkar sem leyfa að fara milli forsíðu og
 * flokks *án þess* að nota sjálfgefna <a href> virkni—við tökum yfir og sjáum
 * um sjálf með History API.
 */

import { el, empty } from "./helpers.js";
import { fetchNews } from "./news.js";


/**
 * Sér um smell á flokk og birtir flokkinn *á sömu síðu* og við erum á.
 * Þarf að:
 * - Stoppa sjálfgefna hegðun <a href>
 * - Tæma `container` þ.a. ekki sé verið að setja efni ofan í annað efni
 * - Útbúa link sem fer til baka frá flokk á forsíðu, þess vegna þarf `newsItemLimit`
 * - Sækja og birta flokk
 * - Bæta við færslu í `history` þ.a. back takki virki
 *
 * Notum lokun þ.a. við getum útbúið föll fyrir alla flokka með einu falli. Notkun:
 * ```
 * link.addEventListener('click', handleCategoryClick(categoryId, container, newsItemLimit));
 * ```
 *
 * @param {string} id ID á flokk sem birta á eftir að smellt er
 * @param {HTMLElement} container Element sem á að birta fréttirnar í
 * @param {number} newsItemLimit Hámark frétta sem á að birta
 * @returns {function} Fall sem bundið er við click event á link/takka
 */
 function handleCategoryClick(id, container, newsItemLimit) {
    return (e) => {
      e.preventDefault();
  
      // TODO útfæra
      empty('main')
      fetchAndRenderCategory(id,'main','""',20)
    };
  }
  
  /**
   * Eins og `handleCategoryClick`, nema býr til link sem fer á forsíðu.
   *
   * @param {HTMLElement} container Element sem á að birta fréttirnar í
   * @param {number} newsItemLimit Hámark frétta sem á að birta
   * @returns {function} Fall sem bundið er við click event á link/takka
   */
  function handleBackClick(container, newsItemLimit) {
    return (e) => {
      e.preventDefault();
      empty(container)
      fetchAndRenderLists(container,newsItemLimit)
    };
  }
  
  /**
   * Útbýr takka sem fer á forsíðu.
   * @param {HTMLElement} container Element sem á að birta fréttirnar í
   * @param {number} newsItemLimit Hámark frétta sem á að birta
   * @returns {HTMLElement} Element með takka sem fer á forsíðu
   */
  export function createCategoryBackLink(container, newsItemLimit) {
    let takki = el('a')
    takki.addEventListener("click", handleBackClick(container,newsItemLimit))
  }
  
  /**
   * Sækir grunnlista af fréttum, síðan hvern flokk fyrir sig og birtir nýjustu
   * N fréttir úr þeim flokk með `fetchAndRenderCategory()`
   * @param {HTMLElement} container Element sem mun innihalda allar fréttir
   * @param {number} newsItemLimit Hámark fjöldi frétta sem á að birta í yfirliti
   */
  export async function fetchAndRenderLists(container, newsItemLimit) {
    // Byrjum á að birta loading skilaboð
    container.appendChild(el("p","sæki fréttir..."))

    fetchNews()
      .then(data => {
        empty(container)
        for (const item of data) {
          const link = el('a','allar fréttir')
          link.setAttribute("href","/?category="+item.id)
          link.addEventListener("click",handleCategoryClick(item.id,container,newsItemLimit))
          fetchAndRenderCategory(item.id,container,link,newsItemLimit)
        }
      }
    )
      .catch(error => console.error(error))
  
  }
  
  /**
   * Sækir gögn fyrir flokk og birtir í DOM.
   * @param {string} id ID á category sem við erum að sækja
   * @param {HTMLElement} parent Element sem setja á flokkinn í
   * @param {HTMLELement | null} [link=null] Linkur sem á að setja eftir fréttum
   * @param {number} [limit=Infinity] Hámarks fjöldi frétta til að sýna
   */
  export async function fetchAndRenderCategory(
    id,
    parent,
    link = null,
    limit = Infinity
  ) {
    let section = el('section', el("p","Sæki gögn..."))
    parent.appendChild(section)
    fetchNews(id)
      .then(data => {
        empty(section)
        if(data === null) {
          section.appendChild(el("p", "Villa kom upp!"))
          return
        }

        for (let i = 0; i < limit; i++) {
          // console.log(data.items[i].title)
          section.appendChild(el('p',data.items[i].title))
        }
        section.appendChild(link)
      }
    )
      .catch(error => {
        empty(parent)
        console.error(error)
      })
    }
    // Búum til <section> sem heldur utan um flokkinn
  
    // Bætum við parent og þannig DOM, allar breytingar héðan í frá fara gegnum
    // container sem er tengt parent
  
    // Setjum inn loading skilaboð fyrir flokkinn
  
    // Sækjum gögn fyrir flokkinn og bíðum
  
    // Fjarlægjum loading skilaboð
  
    // Ef það er linkur, bæta honum við
  
    // Villuskilaboð ef villa og hættum
  
    // Skilaboð ef engar fréttir og hættum
  
    // Bætum við titli
  
    // Höfum fréttir! Ítrum og bætum við <ul>
