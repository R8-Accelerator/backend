import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';

const App = () => {
  return (
    <Switch>
      <Route path={`/settings/${pluginId}`} component={HomePage} exact />
      <Route component={AnErrorOccurred} />
    </Switch>
  );
};

export default App;
