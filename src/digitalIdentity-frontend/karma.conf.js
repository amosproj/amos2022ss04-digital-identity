// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      // for firefox 
      // require('core-js/es6/promise'),
      require('karma-ie-launcher'),
      require('karma-firefox-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-spec-reporter')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/digital-identity'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        emitWarning: false,
        global: {
          statements: 75,
          branches: 75,
          functions: 75,
          lines: 75
          // excludes: [
          //   'path/to/exlude'
          // ],
          // overrides: {
          //   'path/to/overrride': {
          //     statements: 98
          //   }

        },
        each: {
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50,
          // excludes: [
          //   'path/to/exlude'
          // ],
          // overrides: {
          //   'path/to/overrride': {
          //     statements: 98
          //   }

        }
      }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    // Chose the browser you want to use: 
    // browsers: ['Chrome', 'Firefox', 'FirefoxDeveloper', 'FirefoxAurora', 'FirefoxNightly'],
    singleRun: false,
    restartOnFileChange: true
  });
};
