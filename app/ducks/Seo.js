import { location } from '../config';

const seoData = {
  ru: [
    {
      id: 1,
      url: '/',
      seo_title: 'Покупка и продажа изделий ручной работы, хендмейд',
      seo_keywords: 'хендмейд, магазин, интернет, ручная, работа, маркетплейс, изделия, handmade, поделки, своими, руками',
      seo_description: 'Хендмейд интернет магазин - покупайте и продавайте винтажные товары, изделия, сделанные своими руками, а также расходные материалы для рукоделия.'
    },
    {
      id: 2,
      url: '/new-products/',
      seo_title: 'Новые работы пользователей',
      seo_description: 'Самые последние поступления работ наших пользователей'
    },
    {
      id: 3,
      url: '/popular-products/',
      seo_title: 'Популярные работы ручной работы',
      seo_description: 'Популярные работы ручной работы на сайте Abbigli'
    },
    {
      id: 4,
      url: '/set-the-mood/',
      seo_title: 'Создайте своё настроение!',
      seo_description: 'Создайте настроение, радость, или просто новость на Abbigli'
    },
    {
      id: 5,
      url: '/blogs/',
      seo_title: 'Блоги',
      seo_description: 'Тут вы найдете уроки по ручным композициям, ручной работе и просто уроки о хендмейд'
    },
    {
      id: 6,
      url: '/events/',
      seo_title: 'События',
      seo_description: 'Последние события на сайте Abbigli.RU'
    },
    {
      id: 7,
      url: '/nearest-products/',
      seo_title: 'Последние продукты которые находятся рядом с вами',
      seo_description: 'Товары, продукты, которые окружают вас рядом!'
    },
    {
      id: 8,
      url: '/page/about',
      seo_title: 'О нас',
      seo_description: 'Описание сайта Abbigli.RU'
    },
    {
      id: 9,
      url: '/page/faq',
      seo_title: 'FAQ',
      seo_description: 'Правило пользования сайта и то что вы можете тут делать.'
    }
  ],
  en: [
    {
      id: 1,
      url: '/',
      seo_title: 'Your place to buy and sell all things handmade items',
      seo_keywords: 'handmade, marketplace, crafts, gifts, sell, online, buy, sites, artwork, homemade',
      seo_description: 'Handmade fair. Buy and sell vintage goods, handicraft, and materials for handmade. All handicraft goods represented in our shop are made in a single copy.'
    },
    {
      id: 2,
      url: '/new-products/',
      seo_title: 'New user experience',
      seo_description: 'The most recent entries we received from our users'
    },
    {
      id: 3,
      url: '/popular-products/',
      seo_title: 'Popular handmade work',
      seo_description: 'Popular handmade work on the website'
    },
    {
      id: 4,
      url: '/set-the-mood/',
      seo_title: 'Create your mood!',
      seo_description: 'Create a mood, joy, or just news on Abbigli'
    },
    {
      id: 5,
      url: '/blogs/',
      seo_title: 'Blogs on Abbigli',
      seo_description: 'Here you will find lessons according to manual songs, manual work and simple lessons about handmade'
    },
    {
      id: 6,
      url: '/events/',
      seo_title: 'Events in Abbigli',
      seo_description: 'Recent events on the website Abbigli'
    },
    {
      id: 7,
      url: '/nearest-products/',
      seo_title: 'Latest products near you',
      seo_description: 'Goods, products that surround you near!'
    },
    {
      id: 8,
      url: '/page/about',
      seo_title: 'About us',
      seo_description: 'Description of the site Abbigli.com'
    },
    {
      id: 9,
      url: '/page/faq',
      seo_title: 'FAQ',
      seo_description: 'The rule of using the website and what you can do.'
    }
  ],
};

const initialState = {
  data: seoData[location],
};

// Reducer
export default function (state = initialState) {
  return state;
}
