import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';

import { toHaveStyle } from '../../src/matchers/to-have-style';

expect.extend({ toHaveStyle });

describe('toHaveStyle', () => {
  it('passes if the component has the given style, with a style object', () => {
    const wrapper = shallow(<View style={{ backgroundColor: 'navy' }} />);
    expect(wrapper).toHaveStyle('backgroundColor', 'navy');
  });

  it('passes if the component has the given style, with an array of styles', () => {
    const styleArray = [
      { backgroundColor: 'navy' },
      {},
      { backgroundColor: 'turquoise' },
      { color: 'white' },
    ];
    const wrapper = shallow(<View style={styleArray} />);
    expect(wrapper).toHaveStyle('backgroundColor', 'turquoise');
  });

  it('fails if the component type does not have the given style (check style object)', () => {
    const wrapper = shallow(<View style={{ backgroundColor: 'navy' }} />);
    expect(() => expect(wrapper).toHaveStyle('backgroundColor', 'blue'))
      .toThrowErrorMatchingInlineSnapshot(`
"[2mexpect([22m[31mreceived[39m[2m).toHaveStyle()[22m

Expected element to have style {backgroundColor: blue}.
  [31m\\"{backgroundColor: navy}\\"[39m"
`);
  });

  it('fails if the component type does not have the given style (check style array)', () => {
    const wrapper = shallow(<View style={[{ backgroundColor: 'navy' }, {}]} />);
    expect(() => expect(wrapper).toHaveStyle('backgroundColor', 'blue'))
      .toThrowErrorMatchingInlineSnapshot(`
"[2mexpect([22m[31mreceived[39m[2m).toHaveStyle()[22m

Expected element to have style {backgroundColor: blue}.
  [31m\\"{backgroundColor: navy}\\"[39m"
`);
  });

  it('fails if the component type does not have the given style (check no styles)', () => {
    const wrapper = shallow(<View />);
    expect(() => expect(wrapper).toHaveStyle('backgroundColor', 'blue'))
      .toThrowErrorMatchingInlineSnapshot(`
"[2mexpect([22m[31mreceived[39m[2m).toHaveStyle()[22m

Expected element to have style {backgroundColor: blue}.
  [31m\\"{backgroundColor: undefined}\\"[39m"
`);
  });
});

describe('not.toHaveStyle', () => {
  it('passes if the component lacks the given style, with no styles', () => {
    const wrapper = shallow(<View />);
    expect(wrapper).not.toHaveStyle('backgroundColor', 'blue');
    expect(wrapper).not.toHaveStyle('color', 'navy');
  });

  it('passes if the component lacks the given style, with a style object', () => {
    const wrapper = shallow(<View style={{ backgroundColor: 'navy' }} />);
    expect(wrapper).not.toHaveStyle('backgroundColor', 'blue');
    expect(wrapper).not.toHaveStyle('color', 'navy');
  });

  it('passes if the component lacks the given style, with an array of styles', () => {
    const styleArray = [
      { backgroundColor: 'navy' },
      {},
      { backgroundColor: 'turquoise' },
      { color: 'white' },
    ];
    const wrapper = shallow(<View style={styleArray} />);
    expect(wrapper).not.toHaveStyle('backgroundColor', 'navy');
    expect(wrapper).not.toHaveStyle('padding', 5);
  });

  it('fails if the component type has the given style (check style object)', () => {
    const wrapper = shallow(<View style={{ backgroundColor: 'navy' }} />);
    expect(() => expect(wrapper).not.toHaveStyle('backgroundColor', 'navy'))
      .toThrowErrorMatchingInlineSnapshot(`
"[2mexpect([22m[31mreceived[39m[2m).not.toHaveStyle()[22m

Expected element not to have style {backgroundColor: navy}.
  [31m\\"{backgroundColor: navy}\\"[39m"
`);
  });

  it('fails if the component type has the given style (check style array)', () => {
    const styleArray = [
      { backgroundColor: 'navy' },
      {},
      { backgroundColor: 'turquoise' },
      { color: 'white' },
    ];
    const wrapper = shallow(<View style={styleArray} />);
    expect(() => expect(wrapper).not.toHaveStyle('backgroundColor', 'turquoise'))
      .toThrowErrorMatchingInlineSnapshot(`
"[2mexpect([22m[31mreceived[39m[2m).not.toHaveStyle()[22m

Expected element not to have style {backgroundColor: turquoise}.
  [31m\\"{backgroundColor: turquoise}\\"[39m"
`);
  });
});
