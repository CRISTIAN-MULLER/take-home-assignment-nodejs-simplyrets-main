/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleNameMapper: {
    '^@api(|/.*)$': '<rootDir>/src/api/$1',
    '^@controllers(|/.*)$': '<rootDir>/src/controllers/$1',
    '^@dtos(|/.*)$': '<rootDir>/src/dtos/$1',
    '^@entities(|/.*)$': '<rootDir>/src/entities/$1',
    '^@repositories(|/.*)$': '<rootDir>/src/repositories/$1',
    '^@services(|/.*)$': '<rootDir>/src/services/$1',
    '^@routes(|/.*)$': '<rootDir>/src/routes/$1',
    '^@utils(|/.*)$': '<rootDir>/src/utils/$1',
  },
};
