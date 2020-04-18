import React from 'react';
import { Text, View } from 'react-native';
import { shallow } from 'enzyme';

import { toBeOfComponentType } from '../../src/matchers/to-be-of-component-type';

expect.extend({ toBeOfComponentType });

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <View>
      <Text>Nom nom nom strawberry pavlova...</Text>
    </View>,
  );
});

describe('toBeOfComponentType', () => {
  it('passes if the component type matches', () => {
    expect(wrapper).toBeOfComponentType('View');
    expect(wrapper.childAt(0)).toBeOfComponentType('Text');
  });

  it('fails if the component type does not match', () => {
    expect(() => expect(wrapper).toBeOfComponentType('Text')).toThrowErrorMatchingInlineSnapshot(
      `
"[2mexpect([22m[31mreceived[39m[2m).toBeOfComponentType()[22m

Expected element to be of component type Text:
  [31m\\"View\\"[39m"
`,
    );
  });
});

describe('not.toBeOfComponentType', () => {
  it('passes if the component type differs', () => {
    expect(wrapper).not.toBeOfComponentType('Text');
    expect(wrapper.childAt(0)).not.toBeOfComponentType('YodelingBear');
  });

  it('fails if the component type does matches', () => {
    expect(() => expect(wrapper).not.toBeOfComponentType('View'))
      .toThrowErrorMatchingInlineSnapshot(`
"[2mexpect([22m[31mreceived[39m[2m).not.toBeOfComponentType()[22m

Expected element not to be of component type View:
  [31m\\"View\\"[39m"
`);
  });
});
