import { isEmail } from './helpers';

describe('helpers', () => {
  describe('isEmail', () => {
    it('should validate email correctly', () => {
      expect(isEmail('test@gmail.com')).toBeTruthy();
      expect(isEmail('invalid-email')).toBeFalsy();
    })
  })
})