import { ShallowWrapper } from 'enzyme';
import { matcherHint, printReceived } from 'jest-matcher-utils';
import { getStyleProperty } from '../helpers/get-style';

function print(name, value) {
  return `{${name}: ${value}}`;
}

function passMessage(styleName, expectedValue, actualValue) {
  return () =>
    matcherHint('.not.toHaveStyle', 'received', '') +
    `\n\nExpected element not to have style ${print(styleName, expectedValue)}.\n` +
    `  ${printReceived(print(styleName, actualValue))}`;
}

function failMessage(styleName, expectedValue, actualValue) {
  return () =>
    matcherHint('.toHaveStyle', 'received', '') +
    `\n\nExpected element to have style ${print(styleName, expectedValue)}.\n` +
    `  ${printReceived(print(styleName, actualValue))}`;
}

/** Checks if a shallow-rendered enzyme element has a given style. */
function toHaveStyle(receivedElem, styleName, styleValue) {
  if (!(receivedElem instanceof ShallowWrapper)) {
    throw new Error(`Expected ${receivedElem} to be an enzyme ShallowWrapper!`);
  }

  const actualStyleValue = getStyleProperty(receivedElem, styleName);
  const pass = actualStyleValue === styleValue;

  const message = pass
    ? passMessage(styleName, styleValue, actualStyleValue)
    : failMessage(styleName, styleValue, actualStyleValue);

  return { pass, message };
}

export { toHaveStyle };
