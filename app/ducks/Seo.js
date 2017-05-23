// Sections.js
import fetch from 'isomorphic-fetch';
import { API_URL, location } from 'config';

// Actions
const SET = 'abbigli/seo/SET';
const seoData = {
  ru: [
    {
      "id": 1,
      "url": "/",
      "seo_title": "Покупка и продажа изделий ручной работы, хендмейд",
      "seo_keywords": "хендмейд, магазин, интернет, ручная, работа, маркетплейс, изделия, handmade, поделки, своими, руками",
      "seo_description": "Ярмарка хендмейд, покупайте и продавайте винтажные товары, изделия, сделанные своими руками, а также расходные материалы для рукоделия. Изделия ручной работы в интернет магазине сделаны в единственном экземпляре"
    },
    {
      "id": 2,
      "url": "/new-products/",
      "seo_title": "Новые работы пользователей",
      "seo_description": "Самые последние поступления работ наших пользователей"
    },
    {
      "id": 3,
      "url": "/popular-products/",
      "seo_title": "Популярные работы ручной работы",
      "seo_description": "Популярные работы ручной работы на сайте Abbigli"
    },
    {
      "id": 4,
      "url": "/set-the-mood/",
      "seo_title": "Создайте своё настроение!",
      "seo_description": "Создайте настроение, радость, или просто новость на Abbigli"
    },
    {
      "id": 5,
      "url": "/blogs/",
      "seo_title": "Блоги",
      "seo_description": "Тут вы найдете уроки по ручным композициям, ручной работе и просто уроки о хендмейд"
    },
    {
      "id": 6,
      "url": "/events/",
      "seo_title": "События",
      "seo_description": "Последние события на сайте Abbigli.RU"
    },
    {
      "id": 7,
      "url": "/nearest-products/",
      "seo_title": "Последние продукты которые находятся рядом с вами",
      "seo_description": "Товары, продукты, которые окружают вас рядом!"
    },
    {
      "id": 8,
      "url": "/page/about",
      "seo_title": "О нас",
      "seo_description": "Описание сайта Abbigli.RU"
    },
    {
      "id": 9,
      "url": "/page/faq",
      "seo_title": "FAQ",
      "seo_description": "Правило пользования сайта и то что вы можете тут делать."
    }
  ],
  en: [
    {
      "id": 1,
      "url": "/",
      "seo_title": "Your place to buy and sell all things handmade items",
      "seo_keywords": "handmade, marketplace, crafts, gifts, sell, online, buy, sites, artwork, homemade",
      "seo_description": "Buy and sell handmade or vintage items, art and supplies on Abbigli, the world's most vibrant handmade marketplace. Share stories through mi"
    },
    {
      "id": 2,
      "url": "/new-products/",
      "seo_title": "New user experience",
      "seo_description": "The most recent entries we received from our users"
    },
    {
      "id": 3,
      "url": "/popular-products/",
      "seo_title": "Popular handmade work",
      "seo_description": "Popular handmade work on the website"
    },
    {
      "id": 4,
      "url": "/set-the-mood/",
      "seo_title": "Create your mood!",
      "seo_description": "Create a mood, joy, or just news on Abbigli"
    },
    {
      "id": 5,
      "url": "/blogs/",
      "seo_title": "Blogs on Abbigli",
      "seo_description": "Here you will find lessons according to manual songs, manual work and simple lessons about handmade"
    },
    {
      "id": 6,
      "url": "/events/",
      "seo_title": "Events in Abbigli",
      "seo_description": "Recent events on the website Abbigli"
    },
    {
      "id": 7,
      "url": "/nearest-products/",
      "seo_title": "Latest products near you",
      "seo_description": "Goods, products that surround you near!"
    },
    {
      "id": 8,
      "url": "/page/about",
      "seo_title": "About us",
      "seo_description": "Description of the site Abbigli.com"
    },
    {
      "id": 9,
      "url": "/page/faq",
      "seo_title": "FAQ",
      "seo_description": "The rule of using the website and what you can do."
    }
  ],
};


const initialState = {
  data: seoData[location],
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        data: action.data.results,
        isFetching: false,
      });
    default:
      return state;
  }
}

export function setData(responseData) {
  return { type: SET, data: responseData };
}

export function fetchData() {
  return dispatch => fetch(`${API_URL}seo/`)
    .then(res => res.json())
    .then(response => dispatch(setData(response)));
}
