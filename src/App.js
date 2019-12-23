import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import './css/App.css';
import Home from './pages/Home';
import About from './pages/About';
import Detail from './pages/Detail';
import Search from './pages/Search'
import Header from './component/Header'
import Footer from './component/Footer'
import ErrorBoundary from './component/ErrorBoundary'

const App = () => (
  <div>
    <Header />
        <Switch>
          <ErrorBoundary>
            <Route exact name="Home" path="/" component={Home} />
            <Route exact name="About" path="/About" component={About} />
            <Route exact name="Detail" path="/Detail/:id/:nama_kost" component={Detail} />
            <Route exact name="Search" path="/Search/:searchQuery" component={Search} />
          </ErrorBoundary>
        </Switch>
      <Footer/>
  </div>
);

export default App;
