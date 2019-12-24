import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './views/LoginPage';
import NotFound from './views/NotFoundPage';
import HomePage from './views/HomePage';
import store from './store';
import Navbar from './components/Navbar';

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<div data-testid='app'>
					<Navbar />
					<Switch>
						<Route path='/' exact component={HomePage} />
						<Route path='/login' exact component={Login} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}
