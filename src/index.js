import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/ContainerReducer';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fontawesome/css/all.min.css';

// Route
import {BrowserRouter , Route, Switch} from 'react-router-dom'
import routes from './config/routes'
// End Route

// Pace
import 'pace-js';
import 'pace-js/themes/yellow/pace-theme-minimal.css';
//End Pace

import './assets/scss/global.scss';

const ContainerPage =  React.lazy(()=>import('./views/layouts/Container'))

ReactDOM.render(
    <Provider store={configureStore()}>
        <BrowserRouter>
            <Switch>
                <Suspense fallback={<div>Loading...</div>}>
                    {routes.map((route, idx) => {
                        return route.component ? (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                    <Suspense fallback={<p>loading ...</p>}>
                                        <ContainerPage title={route.title} viewPage={route.component} {...props} />
                                    </Suspense>
                            )} />
                        ) : (null);
                    })}
                </Suspense>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
