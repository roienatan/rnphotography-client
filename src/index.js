import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import IeCompatibility from './IeCompatibility/IeCompatibility';
import { isIE } from './utilities';
import { Provider } from 'react-redux';
import { store } from './redux';
//import { isUserTouching } from './redux';
//import { connect } from 'react-redux';

// /**
//  * Checks whether the screen is touch or not
//  * @returns {null}
//  */
// window.addEventListener('touchstart', function onFirstTouch() {
//     // or set some global variable
//     window.USER_IS_TOUCHING = true;

//     // we only need to know once that a human touched the screen, so we can stop listening now
//     window.removeEventListener('touchstart', onFirstTouch, false);
// }, false);

if (isIE()) {
    ReactDOM.render(<IeCompatibility />, document.getElementById('root'));
}

else {
    ReactDOM.render(
        <Provider store={store}>
                <App />
        </Provider>, document.getElementById('root'));
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
