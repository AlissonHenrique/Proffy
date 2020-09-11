
import React from 'react';
import { Switch,BrowserRouter,Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import TeacherListPage from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';

const Routes: React.FC = () => (
  <BrowserRouter>
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/study" component={TeacherListPage} />
    <Route path="/give-classes" component={TeacherForm} />
  </Switch>
  </BrowserRouter>
);

export default Routes;
