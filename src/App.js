import React from 'react';
import { Router, Route } from 'react-router-dom';
import './App.scss';
import Home from './Home/Home';
import Albums from './Albums/Albums';
import Album from './Albums/Album';
import About from './About/About';
import Contact from './Contact/Contact';
import { Provider } from 'react-redux';
import { store } from './redux';
import Login from './Login/Login';
import history from './history';

class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <Route path='/' exact component={Home} />
            <Route path='/albums' exact component={Albums} />
            <Route path='/albums/:albumId' component={Album} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/login' component={Login} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;