module.exports = {
  // ... other configurations
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  reporters: [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "Test Report",
      "outputPath": "test-report.html"
    }]
  ]
};