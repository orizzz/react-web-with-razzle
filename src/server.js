import App from './App';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './App.module.css'
import {StaticRouter}  from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    const helmet = Helmet.renderStatic();
    
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
        <html ${helmet.htmlAttributes.toString()}>
        <head>
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${helmet.title.toString()}
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''}
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
