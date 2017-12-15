/* eslint-disable no-console,global-require,no-underscore-dangle,import/no-extraneous-dependencies,max-len */

import React from 'react';
import { RouterContext } from 'react-router';
import match from 'react-router/lib/match';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import helmet from 'react-helmet';

import path from 'path';
import fs from 'fs';

import routes from '../../app/routes';

const isProd = process.env.NODE_ENV === 'production';
const lang = process.env.LOCATION;
const domain = process.env.DOMAIN_URL.slice(0, -1);

const assetsUrl = isProd ? '' : 'http://localhost:8080';
let jsUrl;
let cssUrl;
let commonCss;

if (isProd) {
  const ClientBundleAssets = JSON
    .parse(fs.readFileSync(path.resolve(__dirname, '../../public/assets/assets.json'), 'utf8'));

  jsUrl = ClientBundleAssets.main.js;
  cssUrl = ClientBundleAssets.main.css;
  commonCss = fs.readFileSync(path.resolve(__dirname, `../../public${cssUrl}`), 'utf8');
} else {
  jsUrl = '/public/assets/bundle.js';
  cssUrl = '/public/assets/style.css';
  commonCss = '';
}

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
  ru: `
  <!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter39079715 = new Ya.Metrika({
                    id:39079715,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/39079715" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
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
  const store = req.redux;
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
      lang,
      store: encodeURI(JSON.stringify(store.getState())),
      seo,
      commonCss,
      canonical: `${domain}${req.path}`,
      metriks: metriks[lang],
    });
  });
};
