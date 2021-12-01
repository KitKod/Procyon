const tsconfigJson = require('./tsconfig.json');

module.exports = {
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['html', 'lcovonly'],
    collectCoverageFrom: ['src/**/{!(*.module),}.ts'],
    transformIgnorePatterns: ['node_modules'],
    moduleNameMapper: {
        ...Object.entries(tsconfigJson.compilerOptions.paths ?? {}).reduce(
            (acc, [alias, [path]]) => ({
                ...acc,
                [`^${alias.replace('/*', '')}(.*)$`]: `<rootDir>${path.replace('/*', '')}$1`
            }),
            {}
        ),
        "^lodash-es$": "lodash"
    },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            diagnostics: true,
        },
    },
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
};
