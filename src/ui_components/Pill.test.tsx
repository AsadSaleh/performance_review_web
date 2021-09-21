import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Pill from "./Pill";

Enzyme.configure({ adapter: new Adapter() });

describe("Positive case for Pill component", () => {
  const wrapper = shallow(<Pill>Testing aja gan</Pill>);

  it("Periksa apakah children di render dengan baik", () => {
    expect(wrapper.find("span").text()).toEqual("Testing aja gan");
  });

  it("Cuma punya satu child span", () => {
    expect(wrapper.find("span")).toHaveLength(1);
  });
});

describe("Negative case for Pill component", () => {
  const wrapper = shallow(<Pill>{null}</Pill>);

  it("Periksa apakah komponen jalan dengan baik walaupun dikasih input null", () => {
    expect(wrapper.find("span")).toHaveLength(1);
    expect(wrapper.find("span").text()).toEqual("Unknown");
  });
});
