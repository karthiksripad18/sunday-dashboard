import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactLoading from 'react-loading';

import Overview from './pages/Overview/Overview';
import Navbar from './components/Navbar/Navbar';

import './App.css';import PageNotFound from './pages/PageNotFound/PageNotFound';
;

const GameDetails = lazy(() => import('./pages/GameDetails/GameDetails'));

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Overview />
        </Route>
        <Route path="/game/:id">
          <Suspense fallback={<ReactLoading type={'spin'} color={'white'} height={75} width={75} />}>
            <GameDetails />
          </Suspense>
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
// just for checking
