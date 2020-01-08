import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LoginPage from './views/LoginPage';
import Signup from './views/Signup';
import Request from './views/Request';
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
						<Route path='/profile/:userId' component={Profile} />
						<Route path='/profile' component={Profile} />
						<Route path='/signup' exact component={Signup} />
						<Route path='/login' exact component={LoginPage} />
						<Route
							path='/auth/forgot-password'
							component={ForgotPasswordPage}
						/>
						<Route path='/auth/reset-password' component={ResetPasswordPage} />
						<Route path='/requests' exact component={Request} />
						<Route path='/' exact component={HomePage} />
						<Route component={NotFound} />
					</Switch>
					<ToastContainer />
				</div>
				<Footer />
			</Router>
		</Provider>
	);
}
