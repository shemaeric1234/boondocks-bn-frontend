import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import NotFound from './views/NotFoundPage';
import HomePage from './views/HomePage';

export default function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/login' exact component={Login} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</Router>
	);
}
