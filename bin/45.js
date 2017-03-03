#!/usr/bin/env node
"use strict";
var EOL = require('os').EOL;
var fourtyFive = require("../lib");
var testFiles = process.argv.slice(2);

require('ts-node/register')
require('buba/register')

fourtyFive.fourtyFive(fourtyFive.findAllTests(testFiles.length === 0 ? void 0 : testFiles))
  .then(function (result) {
    var failures = result.failures;
    var message = result.message;

    if (!message.trim())
      console.log('No tests were run');
    else
      console.log(EOL + trimResult(message));

    process.exit(failures);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

function trimResult (message) {
  return message
    .replace(new RegExp(`[${EOL}]{3,}`, 'g'), '')
    .trim()
};
