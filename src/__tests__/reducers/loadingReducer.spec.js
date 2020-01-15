import loadingReducer from '../../store/reducers/loadingReducer';
import { LOADING, BUTTON_LOADING } from '../../store/actions/types';

describe('Reset Password Reducer Tests ', () => {
	it('Should change loading to true', () => {
		const loadingTrue = {
			type: LOADING,
			payload: true
		};
		const changedState = loadingReducer(undefined, loadingTrue);
		expect(changedState).toEqual({
			loading: loadingTrue.payload,
			buttonLoading: false
		})
	});

	it('Should change loading to false', () => {
		const loadingFalse = {
			type: LOADING,
			payload: false
		};
		const changedState = loadingReducer(undefined, loadingFalse);
		expect(changedState).toEqual({
			loading: loadingFalse.payload,
			buttonLoading: false
		})
	});

	it('Should change button loading to true', () => {
		const btnLoadingTrue = {
			type: BUTTON_LOADING,
			payload: true
		};
		const changedState = loadingReducer(undefined, btnLoadingTrue);
		expect(changedState).toEqual({
			loading: false,
			buttonLoading: true
		})
	});

	it('Should change button loading to false', () => {
		const btnLoadingFalse = {
			type: BUTTON_LOADING,
			payload: false
		};
		const changedState = loadingReducer(undefined, btnLoadingFalse);
		expect(changedState).toEqual({
			loading: false,
			buttonLoading: false
		})
	});

	it('Should return default state', () => {
		const defaultState = loadingReducer(undefined, {});
		expect(defaultState).toEqual({
			loading: false,
			buttonLoading: false,
		})
	});
});
