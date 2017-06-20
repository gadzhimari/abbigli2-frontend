/* eslint-disable no-console,global-require,no-underscore-dangle,import/no-extraneous-dependencies,max-len */

import React from 'react';
import { RouterContext } from 'react-router';
import match from 'react-router/lib/match';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import helmet from 'react-helmet';

import path from 'path';
import fs from 'fs';

import configureStore from '../../app/store';
import routes from '../../app/routes';

const isProd = process.env.NODE_ENV === 'production';
const lang = process.env.LOCATION;

const assetsUrl = isProd ? '' : 'http://localhost:8080';
let jsUrl;
let cssUrl;

if (isProd) {
  const ClientBundleAssets = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../public/assets/assets.json'), 'utf8')
  );

  jsUrl = ClientBundleAssets.main.js;
  cssUrl = ClientBundleAssets.main.css;
} else {
  jsUrl = '/public/assets/bundle.js';
  cssUrl = '/public/assets/style.css';
}

const commonCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/common.html'), 'utf8');
const aboutCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/about.html'), 'utf8');
const blogsCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/blogs.html'), 'utf8');
const eventsCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/events.html'), 'utf8');
const faqCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/faq.html'), 'utf8');
const newpostCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/newposts.html'), 'utf8');
const createCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/create.html'), 'utf8');
const sectionsCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/sections.html'), 'utf8');

const linksToCss = {
  blogs: blogsCss,
  'blog/:slug': blogsCss,
  events: eventsCss,
  'event/:slug': eventsCss,
  'page/faq': faqCss,
  'page/about': aboutCss,
  'new-products': newpostCss,
  'nearest-products': newpostCss,
  'popular-products': newpostCss,
  'set-the-mood': newpostCss,
  'post/new': createCss,
  'sections/:section': sectionsCss,
  'sections/:section/:tag': sectionsCss,
  'tags/:tags(/:page)': sectionsCss,
};

const metriks = {
  en: `<script>
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-78577116-1', 'auto');
    ga('send', 'pageview');
  </script>`,
  ru: `<!-- Yandex.Metrika counter --> <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter39079715 = new Ya.Metrika({ id:39079715, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/39079715" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78577116-2', 'auto');
  ga('send', 'pageview');

</script>`,
};

module.exports = (req, res) => {
  const store = configureStore();
  const renderRoutes = routes(store, req.cookies.id_token, true);

  match({ routes: renderRoutes, location: req.newPath || req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(404).sendFile(path.resolve(__dirname, '../templates/404.html'));
    }

    const componentHTML = ReactDOM.renderToString(
      <Provider store={store} >
        <RouterContext {...renderProps} />
      </Provider>
    );
    const helmetStatic = helmet.renderStatic();
    const seo = {
      title: helmetStatic.title.toString(),
      meta: helmetStatic.meta.toString(),
    };

    res.render('index', {
      markup: componentHTML,
      baseUrl: assetsUrl,
      jsUrl,
      cssUrl,
      store: encodeURI(JSON.stringify(store.getState())),
      seo,
      commonCss,
      pageCss: linksToCss[renderProps.routes[1].path] || '',
      metriks: metriks[lang],
    });
  });
};
