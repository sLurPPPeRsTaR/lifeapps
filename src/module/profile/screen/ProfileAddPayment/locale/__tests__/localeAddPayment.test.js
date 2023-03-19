import id from '../id';
import en from '../en';

describe('testing profile localization', () => {
  it('should be compare words in locale has same property', () => {
    const enKeys = Object.keys(en);
    enKeys.forEach((key, idx) => {
      expect(en[key]).toDefined();
      expect(id[key]).toDefined();
    });
  });
});
