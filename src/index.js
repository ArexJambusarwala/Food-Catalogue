import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store  from './store/IndexStore'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { lazy, Suspense } from 'react';

const AddRecipe = lazy(() => import('./add_recipe/components/AddRecipe'));
const LandingPage = lazy(() => import('./index/components/LandingPage'));

ReactDOM.render(
  <BrowserRouter forceRefresh={true}>
    <Suspense fallback={null}>
      <Provider store={store}>
        <Switch>
          <Route path="/add-recipe" exact>
            <AddRecipe />
          </Route>
          <Route path={["/", "index"]}>
            <LandingPage />
          </Route>
        </Switch>
      </Provider>
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);
