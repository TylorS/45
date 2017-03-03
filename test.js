const { describe, given, it, equals } = require('./');

exports.test = describe('Array', [
  given('a few numbers', [
    it('has length greater than 0', () => {
      return equals([1, 2, 3].length > 0, true);
    })
  ])
])

exports.otherTest = it('equals 4', () => {
  return Promise.resolve(4).then(equals(4));
})
