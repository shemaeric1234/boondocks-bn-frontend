import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LoginPage from './views/LoginPage';
import Signup from './views/Signup';
import NotFound from './views/NotFoundPage';
import HomePage from './views/HomePage';
import Profile from './components/ProfileContainer';
import Navbar from './components/Navbar';
import Footer from './components/templates/Footer';
import store from './store';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import ResetPasswordPage from './views/ResetPasswordPage';
import Loader from './components/templates/Loader';

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<Loader />
				<Navbar />
				<div data-testid='app' className='App'>
					<Switch>
						<Route path='/signup' exact component={Signup} />
						<Route path='/profile/:userId' component={Profile} />
						<Route path='/profile' component={Profile} />
						<Route path='/login' exact component={LoginPage} />
						<Route
							path='/auth/forgot-password'
							component={ForgotPasswordPage}
						/>
						<Route path='/auth/reset-password' component={ResetPasswordPage} />
						<Route component={NotFound} />
						<Route path='/' exact component={HomePage} />
					</Switch>
					<ToastContainer />
				</div>
				<Footer />
			</Router>
		</Provider>
	);
}
