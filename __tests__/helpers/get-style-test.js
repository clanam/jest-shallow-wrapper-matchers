import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';

import { getStyleProperty } from '../../src/helpers/get-style';

describe('getStyleProperty', () => {
  it('works on a wrapper without any styles', () => {
    const wrapper = shallow(<View />);
    expect(getStyleProperty(wrapper, 'color')).toBe(undefined);
  });

  it('works on a style object', () => {
    const styleObj = { backgroundColor: 'navy', color: 'chartreuse' };
    const wrapper = shallow(<View style={styleObj} />);
    expect(getStyleProperty(wrapper, 'backgroundColor')).toBe('navy');
    expect(getStyleProperty(wrapper, 'color')).toBe('chartreuse');
    expect(getStyleProperty(wrapper, 'fontSize')).toBe(undefined);
  });

  it('works on a style array', () => {
    const styleArray = [
      { backgroundColor: 'navy' },
      {},
      { backgroundColor: 'turquoise', paddingLeft: 5 },
      { color: 'white' },
    ];
    const wrapper = shallow(<View style={styleArray} />);
    expect(getStyleProperty(wrapper, 'backgroundColor')).toBe('turquoise');
    expect(getStyleProperty(wrapper, 'color')).toBe('white');
    expect(getStyleProperty(wrapper, 'fontSize')).toBe(undefined);
  });
});
