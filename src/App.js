import React from 'react';
import Router from './router';
import Provider from './storage';
import './config/ReactotronConfig';

/**
 * Neste arquivo apenas teremos lógicas de entrada
 * por exemplo:
 *  - restaurar contexto
 *  - logs
 */

export default () => (
  <Provider>
    <Router />
  </Provider>
);
