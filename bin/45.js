#!/usr/bin/env node
"use strict";
var EOL = require('os').EOL;
var expand = require("glob-expand");
var fourtyFive = require("../lib");
var path = require("path");
var testFiles = process.argv.slice(2);
var colors = require('typed-colors');

require('ts-node/register')
require('buba/register')

var defaultPatterns = [
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

if (testFiles.length === 0)
    testFiles.push.apply(testFiles, defaultPatterns);

var cwd = process.cwd();

var files = expand({ filter: 'isFile', cwd: cwd }, testFiles);

var filePaths = files.map(function (file) { return path.join(cwd, file); });

var tests = [];

filePaths.forEach(function (path) {
  var pkg = require(path);

  if (isTest(pkg))
    tests.push(pkg);

  Object.keys(pkg).forEach(function (key) {
    var value = pkg[key];

    if (isTest(value))
      tests.push(value);
  });
});

function isTest(x) {
  return x && typeof x.name === 'string' && typeof x.run === 'function';
}

function trimResult (message) {
  return message
    .replace(new RegExp(`[${EOL}]{2,}`, 'g'), '')
    .trim()
};

fourtyFive.fourtyFive(tests)
  .then(function (result) {
    var failures = result.failures;
    var message = result.message;

    if (!message.trim())
      console.log('No tests were run');
    else
      console.log(EOL + trimResult(message));

    process.exit(failures);
});
