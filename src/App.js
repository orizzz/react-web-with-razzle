import React, { lazy } from 'react';
import {Switch} from 'react-router-dom';

import { renderRoutes } from 'react-router-config';
import Routes from './Routes';

import Header from './component/Header'
import Footer from './component/Footer'
import ErrorBoundary from './component/ErrorBoundary'
import './css/App.css'


const App = () => (
  <div>
    <Header />
        <Switch>
          <ErrorBoundary>
            {renderRoutes(Routes)}
          </ErrorBoundary>
        </Switch>
      <Footer/>
  </div>
);

export default App;
