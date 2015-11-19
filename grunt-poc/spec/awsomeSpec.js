// var assert = require('chai').assert
//   , foo = 'bar'
//   , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
    // assert.typeOf(foo, 'string'); // without optional message
    // assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
    // assert.equal(foo, 'bar', 'foo equal `bar`');
    // assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
    // assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
  });
});