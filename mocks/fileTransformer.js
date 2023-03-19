const path = require('path');

module.exports = {
  process(_src, _filename) {
    return `module.exports = ${JSON.stringify(
      path.basename('mocks/mock.svg')
    )};`;
  },
};
