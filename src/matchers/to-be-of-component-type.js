import { ShallowWrapper } from 'enzyme';
import { matcherHint, printReceived } from 'jest-matcher-utils';

function passMessage(expected, actual) {
  return () =>
    matcherHint('.not.toBeOfComponentType', 'received', '') +
    `\n\nExpected element not to be of component type ${expected}:\n` +
    `  ${printReceived(actual)}`;
}

function failMessage(expected, actual) {
  return () =>
    matcherHint('.toBeOfComponentType', 'received', '') +
    `\n\nExpected element to be of component type ${expected}:\n` +
    `  ${printReceived(actual)}`;
}

/** Checks if a shallow-rendered enzyme element to be of a given component type. */
function toBeOfComponentType(receivedElem, expectedComponentType) {
  if (!(receivedElem instanceof ShallowWrapper)) {
    throw new Error(`Expected ${receivedElem} to be an enzyme ShallowWrapper!`);
  }

  const actualType = receivedElem.name();
  const pass = expectedComponentType === actualType;

  const msgFxn = pass ? passMessage : failMessage;
  const message = msgFxn(expectedComponentType, actualType);

  return { pass, message };
}

export { toBeOfComponentType };
