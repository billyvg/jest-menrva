import React from "react";
import { mount } from "enzyme";

import { Index } from "./index";

jest.mock("../util/api", () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
});
describe("Index", function() {
  it("renders", function() {
    let wrapper = mount(<Index repos={["billyvg/menrva"]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
