import React from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./userContext"
import { render } from "@testing-library/react";
import NavBar from './NavBar'
import RoutesBar from "./RoutesBar"

it("renders without crashing", function () {
    let curUser = "billy"
    render(
        <UserContext.Provider value={{ curUser }}>
        <BrowserRouter>
          <NavBar />
          <RoutesBar />
        </BrowserRouter>
      </UserContext.Provider>
    );
  });

  it("matches snapshot", function () {
    let curUser = "billy"
    const { asFragment } = render(
       
            <UserContext.Provider value={{ curUser }}>
            <BrowserRouter>
              <NavBar />
              <RoutesBar />
            </BrowserRouter>
          </UserContext.Provider>
        )
    expect(asFragment()).toMatchSnapshot();
  });