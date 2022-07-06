import 'core-js/es/map';
import 'core-js/es/set';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Olá, mundo!</h1>,
  document.getElementById('root')               //polyfill ambient using core-js giving support to others old browsers
);

/*O React também depende da função requestAnimationFrame (mesmo em ambiente de teste).
Você pode usar o pacote raf como substituto para a função requestAnimationFrame: */

import 'raf/polyfill'