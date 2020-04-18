import { configureCustomTextWrappers, matchers } from '../src';

// Sanity test that I didn't break imports >.>'
it('should not have a broken build', () => {
  expect(configureCustomTextWrappers).toBeInstanceOf(Function);
  expect(matchers).toBeInstanceOf(Object);
});
