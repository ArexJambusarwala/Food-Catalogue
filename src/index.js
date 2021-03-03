import ReactDOM from 'react-dom';
import LandingPage from './index/components/LandingPage'
import { Provider } from 'react-redux';
import store  from './index/store/IndexStore'

ReactDOM.render(
  <Provider store={store}>
    <LandingPage />
  </Provider>,
  document.getElementById('root')
);
