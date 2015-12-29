'use strict';

module.exports = function(config) {
   config.set({
      browsers: ['PhantomJS'],
      browserNoActivityTimeout: 1500,
      captureTimeout: 3000,
      client: {
         mocha: {
            timeout: 1500,
            ui: 'bdd'
         }
      },
      coverageReporter: {
         dir: 'coverage',
         reporters: [
            {
               type: 'text-summary'
            },
            {
               type : 'html'
            },
            {
               type: 'lcovonly',
               subdir: 'lcov'
            }
         ]
      },
      files: [
         'node_modules/jquery/dist/jquery.min.js',
         'src/js/*.js',
         'test/spec/*.js',
         'test/fixtures/*.html'
      ],
      frameworks: [
         'mocha',
         'chai',
         'fixture',
         'phantomjs-shim'
      ],
      port: 9001,
      preprocessors: {
         'src/js/*.js': ['coverage'],
         'test/fixtures/*.html': ['html2js']
      },
      reporters: [
         'mocha',
         'coverage',
         'coveralls'
      ],
      reportSlowerThan: 500,
      singleRun: true
   });
};