import React from "react";
import { queryByAttribute, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "../../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/dom";

describe("Navbar component", () => {
	const getById = queryByAttribute.bind(null, "id");

	it("should render without error", () => {
		const { container } = render(<BrowserRouter><Navbar/></BrowserRouter>);
		expect(getById(container, "nav")).toBeInTheDocument();
	});

	it("should add 'show' class on MouseOver and MouseLeave", () => {
		const { container } = render(<BrowserRouter><Navbar/></BrowserRouter>);
		const navItem = [...container.querySelectorAll(".nav-item")][0];
		fireEvent.mouseOver(navItem);
		fireEvent.mouseLeave(navItem);
		expect([...navItem.classList].includes('show')).not.toBeTruthy()
	});
});
