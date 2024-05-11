// jest.config.js
module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/styleMock.js',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileMock.js'
    },
    testEnvironment: 'jsdom',
    
  };