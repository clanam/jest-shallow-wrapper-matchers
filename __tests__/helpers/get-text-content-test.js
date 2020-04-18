import React from 'react';
import { Text, View } from 'react-native';
import { shallow } from 'enzyme';

import { configureCustomTextWrappers, getTextContent } from '../../src/helpers/get-text-content';

// Add custom text wrapper elements for testing.
configureCustomTextWrappers('BobaTea', 'Tea');
const Tea = (props) => <Text>{props.children + ' 🍵'}</Text>;
const BobaTea = (props) => (
  <View>
    <Tea>{props.children}</Tea>
  </View>
);

describe('getTextContent', () => {
  describe('vanilla React Text elements', () => {
    it('works on a single element', () => {
      const wrapper = shallow(<Text>Nom nom mango mousse!</Text>);
      expect(getTextContent(wrapper)).toEqual(['Nom nom mango mousse!']);
    });

    it('works on a nested element', () => {
      const wrapper = shallow(
        <View>
          <Text>Nom nom mango mousse!</Text>
        </View>,
      );
      expect(getTextContent(wrapper)).toEqual(['Nom nom mango mousse!']);
    });

    it('works on multiple nested elements', () => {
      const wrapper = shallow(
        <View>
          <View>
            <Text>Nom nom mango mousse!</Text>
            <Text>Even more mango mousse?</Text>
          </View>
          <Text>Nom nom nom nom...</Text>
        </View>,
      );
      expect(getTextContent(wrapper)).toEqual([
        'Nom nom mango mousse!',
        'Even more mango mousse?',
        'Nom nom nom nom...',
      ]);
    });
  });

  describe('custom Text wrappers', () => {
    it('works on a single element (simple)', () => {
      const wrapper = shallow(<Tea>This is tea:</Tea>);
      expect(getTextContent(wrapper)).toEqual(['This is tea: 🍵']);
    });

    it('works on a single element (complex)', () => {
      const wrapper = shallow(<BobaTea>This is boba tea:</BobaTea>);
      expect(getTextContent(wrapper)).toEqual(['This is boba tea: 🍵']);
    });

    it('works on a nested element', () => {
      const wrapper = shallow(
        <View>
          <BobaTea>Yum yum yum tea!</BobaTea>
        </View>,
      );
      expect(getTextContent(wrapper)).toEqual(['Yum yum yum tea! 🍵']);
    });

    it('works on multiple nested elements', () => {
      const wrapper = shallow(
        <View>
          <View>
            <Text>Nom nom mango mousse!</Text>
            <Tea>Even more mango mousse?</Tea>
          </View>
          <BobaTea>Nom nom nom nom...</BobaTea>
        </View>,
      );
      expect(getTextContent(wrapper)).toEqual([
        'Nom nom mango mousse!',
        'Even more mango mousse? 🍵',
        'Nom nom nom nom... 🍵',
      ]);
    });
  });
});
