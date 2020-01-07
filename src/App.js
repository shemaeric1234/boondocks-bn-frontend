import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Login from './views/LoginPage';
import Signup from './views/Signup';
import NotFound from './views/NotFoundPage';
import HomePage from './views/HomePage';
import store from './store';
import Navbar from './components/Navbar';
import Footer from './components/templates/Footer';

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<div data-testid='app'>
					<Navbar />
					<Switch>
						<Route path='/' exact component={HomePage} />
						<Route path='/login' exact component={Login} />
						<Route path='/signup' exact component={Signup} />
						<Route component={NotFound} />
					</Switch>
					<ToastContainer />
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}
