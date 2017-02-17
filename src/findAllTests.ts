import * as expand from 'glob-expand';

import { Test } from './';
import { join } from 'path';

const defaultPatterns: Array<string | RegExp> = [
  /.*\.(spec|test)\.(js|ts)$/,
  /-(spec|test)\.(js|ts)$/,
  /(Spec|Test)\.(js|ts)$/,
  'test/**/*.js',
  'test/**/*.ts',
  'tests/**/*.js',
  'tests/**/*.ts',
  '!lib/**/*.*',
  '!lib.es2015/**/*.*',
  '!node_modules/**/*.*',
];

export function findAllTests(testFiles: Array<RegExp | string> = defaultPatterns): Array<Test> {
  const cwd = process.cwd();

  const files = expand({ filter: 'isFile', cwd: cwd }, testFiles);

  const filePaths = files.map(function (file) { return join(cwd, file); });

  const tests: Array<Test> = [];

  filePaths.forEach(function (path) {
    const pkg = require(path);

    if (isTest(pkg))
      tests.push(pkg);

    Object.keys(pkg).forEach(function (key) {
      const value = pkg[key];

      if (isTest(value))
        tests.push(value);
    });
  });

  return tests;
}

function isTest(x: any): x is Test {
  return x && typeof x.name === 'string' && typeof x.run === 'function';
}
