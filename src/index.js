import ReactDOM from 'react-dom';
import LandingPage from './index/components/LandingPage'
import { Provider } from 'react-redux';
import store  from './store/IndexStore'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AddRecipe from './add_recipe/components/AddRecipe'

ReactDOM.render(
  <BrowserRouter forceRefresh={true}>
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
  </BrowserRouter>,
  document.getElementById('root')
);
