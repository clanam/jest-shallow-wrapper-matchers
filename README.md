# jest-shallow-wrapper-matchers

Jest matchers for enzyme shallow wrappers.

 - [What is this?](#what-is-this)
 - [Installation](#installation)
 - [Sample jest setup file code](#sample-jest-setup-file-code)
 - [Matcher list](#matcher-list)

## What is this?

Moving this here so I can reuse between [react-native](https://reactnative.dev/) doodle
projects without having to rewrite it every time I want to add a test. Don't think anyone
else should want this unless they're also on react native and also can't figure out how
to get the mounting shims to work so they're stuck using shallow rendering in
[enzyme](https://enzymejs.github.io/enzyme/docs/guides/react-native.html). 🤷‍♀️

## Installation

```
yarn add --dev jest-shallow-wrapper-matchers
```

## Sample jest setup file code

```
import { configureCustomTextWrappers, matchers } from 'jest-shallow-wrapper-matchers';

// Plus do whatever adapter setup enzyme tells you to do.

// Configure some custom components to do text matching on.
configureCustomTextWrappers('TextWrapperOne', 'CustomHeaderOfBobaTea');
global.expect.extend(matchers);
```

## Matcher list

 - **toBeOfComponentType:** checks if a shallow wrapper is of a given component type.
   This is just a name() check.

 - **toHaveStyle:** checks if a shallow wrapper has a given style property matching a
   given value

 - **toHaveText:** returns an array of the text strings in all Text elements in the
   given shallow wrapper. Will also look for any custom text wrappers used to share
   common styles across Text components. Custom text wrapper types can be configured
   with `configureCustomTextWrappers`

