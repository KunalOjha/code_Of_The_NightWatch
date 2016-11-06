module.exports = { // addapted from: https://git.io/vodU0
  'Guinea Pig Assert Title': function(browser) {
    browser
      .url('https://saucelabs.com/test/guinea-pig')
      .waitForElementVisible('body', 8000)
      .assert.title('I am a page title - Sauce Labs')
      .saveScreenshot('ginea-pig-test.png')
      .end();
  }
};