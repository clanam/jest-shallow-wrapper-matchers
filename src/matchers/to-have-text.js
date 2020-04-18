import { ShallowWrapper } from 'enzyme';
import { matcherHint, printReceived } from 'jest-matcher-utils';

import { getTextContent } from '../helpers/get-text-content';

function passMessage(expected, actual) {
  return () =>
    matcherHint('.not.toHaveText', 'received', '') +
    `\n\nExpected element not to have text ${expected}:\n` +
    `  ${printReceived(actual)}`;
}

function failMessage(expected, actual) {
  return () =>
    matcherHint('.toHaveText', 'received', '') +
    `\n\nExpected element to have text ${expected}:\n` +
    `  ${printReceived(actual)}`;
}

/** Checks if a shallow-rendered enzyme element has a given text string. */
function toHaveText(receivedElem, text) {
  if (!(receivedElem instanceof ShallowWrapper)) {
    throw new Error(`Expected ${receivedElem} to be an enzyme ShallowWrapper!`);
  }

  const expectedText = Array.isArray(text) ? text : [text];
  const actualText = getTextContent(receivedElem);
  const pass =
    expectedText.length === actualText.length && expectedText.every((t, i) => actualText[i] === t);

  const msgFxn = pass ? passMessage : failMessage;
  const printableActual = actualText.length === 1 ? actualText[0] : actualText;
  const message = msgFxn(JSON.stringify(text), printableActual);

  return { pass, message };
}

export { toHaveText };
