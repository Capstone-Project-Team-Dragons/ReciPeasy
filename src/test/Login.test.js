import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Login from '../screens/LoginScreen';

 

describe('<Login />', () => {
    it('renders', () => {
      const wrapper = shallow(<Login />);
      expect(wrapper.exists()).toBe(true);
    });

    // has Login/Sign Up functionality
    it('should have Login/Sign Up buttons', () => {
      const wrapper = shallow(<Login performLogin = {() =>{}} />);
      expect(wrapper.find('Button').length).toEqual(2);
    });
    
  
});