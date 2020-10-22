import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './main.css';
import Rooms from './components/Rooms';


// rooms are mainly going to sit in an 8 by 8 grid
// aw fuck there's also non-intersecting crosses
// that explains a thing or two T_T

// gotta figure out where and how to render the rooms..


ReactDOM.render(
  <section className='main'>
    <Rooms />
  </section>,
  document.getElementById('root')
);

serviceWorker.unregister();
