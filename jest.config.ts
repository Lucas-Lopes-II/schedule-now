import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testRegex: ['.*\\..*spec\\.ts$', '.*\\..*test\\.ts$'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/covarage/',
    '.entity.ts',
    '.interface.ts',
    '.module.ts',
    '.mock.ts',
    'main.ts',
    'index.ts',
    'jest.config.ts',
    'migration.ts',
  ],
};
