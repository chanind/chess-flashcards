const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

// from https://github.com/vercel/next.js/issues/35634
// need to overwrite the /node_modules/ transformIgnorePatterns, but it won't let us do that
const creatJestConfigHack = async () => {
  const config = await createJestConfig(customJestConfig)();
  config.transformIgnorePatterns[0] = '/node_modules/(?!chess.js)';
  return config;
};

module.exports = creatJestConfigHack;
