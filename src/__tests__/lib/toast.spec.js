import * as Toast from 'react-toastify';
import toaster from '../../lib/toast';

describe('Toast tests', () => {

  it('toast success', () => {
    Toast.toast.success = jest.fn();
    toaster('success', 'hey success');
    expect(Toast.toast.success).toHaveBeenCalled();
  });

  it('toast info', () => {
    Toast.toast.info = jest.fn();
    toaster('info', 'hey info');
    expect(Toast.toast.info).toHaveBeenCalled();
  });

  it('toast error', () => {
    Toast.toast.error = jest.fn();
    toaster('error', 'hey error');
    expect(Toast.toast.error).toHaveBeenCalled();
  });

  it('toast default', () => {
    Toast.toast.error = jest.fn();
    toaster();
    expect(Toast.toast.error).toHaveBeenCalled();
  });

});
