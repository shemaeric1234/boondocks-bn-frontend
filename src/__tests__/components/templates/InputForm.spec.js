import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import InputForm from "../../../components/templates/InputForm";
import { fireEvent } from "@testing-library/dom";

describe("InputForm template component", () => {
  const clickCallback = jest.fn();
  const changeCallback = jest.fn();
  it("should not have a label", () => {
    const inputForm = render(<InputForm
      value='Facebook'
      name='facebook'
      onChange={changeCallback}
      type='button'
      classNames=''
      error=''
      label=''
      placeholder=''
      onClick={clickCallback}
    />);
    const labelElement = inputForm.queryByTestId("label-text");
    expect(labelElement).toBeNull();
  });
  it("should have a label", () => {
    const inputForm = render(<InputForm
      value='Facebook'
      name='facebook'
      onChange={changeCallback}
      type='button'
      classNames=''
      error=''
      label='TestLabel'
      placeholder=''
      onClick={clickCallback}
    />);
    expect(inputForm.getByText(/TestLabel/i)).toBeInTheDocument();
  });
  it("should not have a error", () => {
    const inputForm = render(<InputForm
      value='Facebook'
      name='facebook'
      onChange={changeCallback}
      type='button'
      classNames=''
      error=''
      label=''
      placeholder=''
      onClick={clickCallback}
    />);
    const errorElement = inputForm.queryByTestId("error-text");
    expect(errorElement).toBeNull();
  });
  it("should have an error", () => {
    const inputForm = render(<InputForm
      value='Facebook'
      name='facebook'
      onChange={changeCallback}
      type='button'
      classNames=''
      error='TestError'
      label=''
      placeholder=''
      onClick={clickCallback}
    />);
    expect(inputForm.getByText(/TestError/i)).toBeInTheDocument();
  });
  it("should call the click callback on click", () => {
    const inputForm = render(<InputForm
      value='Facebook'
      name='facebook'
      onChange={changeCallback}
      type='button'
      classNames=''
      error='TestError'
      label=''
      placeholder=''
      onClick={clickCallback}
    />);
    fireEvent.click(inputForm.getByTestId('input-field'));
    expect(clickCallback).toBeCalled();
  });
});
