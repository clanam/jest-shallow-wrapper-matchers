import React from 'react';
import { Text, View } from 'react-native';
import { shallow } from 'enzyme';

import { toHaveText } from '../../src/matchers/to-have-text';

expect.extend({ toHaveText });

let wrapper;

describe('toHaveText', () => {
  describe('text element', () => {
    beforeEach(() => {
      wrapper = shallow(<Text>Nom nom mango mousse!</Text>);
    });

    it('passes when matching', () => {
      expect(wrapper).toHaveText('Nom nom mango mousse!');
    });

    it('fails when different', () => {
      expect(() =>
        expect(wrapper).toHaveText('Nom nom chocolate mousse!'),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('nested text element', () => {
    beforeEach(() => {
      wrapper = shallow(
        <View>
          <Text>Nom nom mango mousse!</Text>
        </View>,
      );
    });

    it('passes when matching', () => {
      expect(wrapper).toHaveText('Nom nom mango mousse!');
    });

    it('fails when different', () => {
      expect(() =>
        expect(wrapper).toHaveText('Nom nom chocolate mousse!'),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('multiple nested text elements', () => {
    beforeEach(() => {
      wrapper = shallow(
        <View>
          <View>
            <Text>Nom nom mango mousse!</Text>{' '}
          </View>
          <Text>Nom nom nom nom...</Text>
        </View>,
      );
    });

    it('passes when matching', () => {
      expect(wrapper).toHaveText(['Nom nom mango mousse!', 'Nom nom nom nom...']);
    });

    it('fails when different (check single string expectation)', () => {
      expect(() =>
        expect(wrapper).toHaveText('Nom nom chocolate mousse!'),
      ).toThrowErrorMatchingSnapshot();
    });

    it('fails when different (check array expectation, right size)', () => {
      expect(() =>
        expect(wrapper).toHaveText(['Nom nom chocolate mousse!', 'alphabet soup']),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  it('fails when different (check array expectation, too long)', () => {
    expect(() =>
      expect(wrapper).toHaveText([
        'Nom nom mango mousse!',
        'Nom nom nom nom...',
        'eleven squirrels',
      ]),
    ).toThrowErrorMatchingSnapshot();
  });

  it('fails when different (check array expectation, too short)', () => {
    expect(() =>
      expect(wrapper).toHaveText(['Nom nom mango mousse!']),
    ).toThrowErrorMatchingSnapshot();
  });
});

describe('not.toHaveText', () => {
  describe('empty text element', () => {
    beforeEach(() => {
      wrapper = shallow(<Text />);
    });

    it('passes when different', () => {
      expect(wrapper).not.toHaveText('Nom nom mango mousse!');
    });

    it('fails when same', () => {
      expect(() => expect(wrapper).not.toHaveText('')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('text element', () => {
    beforeEach(() => {
      wrapper = shallow(<Text>Nom nom mango mousse!</Text>);
    });

    it('passes when different', () => {
      expect(wrapper).not.toHaveText('Nom nom strawberry mousse!');
    });

    it('fails when same', () => {
      expect(() =>
        expect(wrapper).not.toHaveText('Nom nom mango mousse!'),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('nested text element', () => {
    beforeEach(() => {
      wrapper = shallow(
        <View>
          <Text>Nom nom mango mousse!</Text>
        </View>,
      );
    });

    it('passes when different', () => {
      expect(wrapper).not.toHaveText('Nom nom cherry mousse!');
    });

    it('fails when different', () => {
      expect(() =>
        expect(wrapper).not.toHaveText('Nom nom mango mousse!'),
      ).toThrowErrorMatchingSnapshot();
    });
  });

  describe('multiple nested text elements', () => {
    beforeEach(() => {
      wrapper = shallow(
        <View>
          <View>
            <Text>Nom nom mango mousse!</Text>{' '}
          </View>
          <Text>Nom nom nom nom...</Text>
        </View>,
      );
    });

    it('passes when different', () => {
      expect(wrapper).not.toHaveText(['Nom nom mango mousse!']);
    });

    it('fails when same', () => {
      expect(() =>
        expect(wrapper).not.toHaveText(['Nom nom mango mousse!', 'Nom nom nom nom...']),
      ).toThrowErrorMatchingSnapshot();
    });
  });
});
