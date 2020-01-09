import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import RegisterPage from "../../views/RegisterPage";
import { BrowserRouter } from "react-router-dom";

describe("RegisterPage view", () => {
	it("should render without error", () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<RegisterPage/>
			</BrowserRouter>
		);
		expect(getByTestId("register-page")).toBeInTheDocument();
	});
});
