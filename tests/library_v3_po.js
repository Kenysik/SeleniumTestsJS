require('chromedriver');
const webdriver = require('selenium-webdriver'),
    Browser = webdriver.Browser,
    {suite, ignore} = require('selenium-webdriver/testing');
const { describe, before, it, after, beforeEach} = require("mocha");
const chai = require('chai');
const assert = chai.assert;
let Page = require('../lib/home_page');
let page;

suite(function (env) {
    ignore(env.browsers(Browser.SAFARI)).describe("Registration", function () {
        this.timeout(0);

        before(async function () {
            page = await new Page();
            await page.driver.manage().setTimeouts({implicit: 10000, pageLoad: 10000, script: 0});
        });

        beforeEach(async function () {
            await page.visit('http://library-app.firebaseapp.com');
        });

        it("Typing valid email changes opacity to 1", async function () {
            let res = await page.requestBtn();
            console.log('opacity: ' +  res.opacity + 'state: ' + res.state);
            assert.equal(res.opacity, '1', "Opacity din't change");
        });

        it("Typing a valid email enables the submit button", async function() {
            let res = await page.requestBtn();
            console.log('opacity: ' +  res.opacity + 'state: ' + res.state);
        });

        it('Clicking Request invitation triggers a confirmation alert', async function () {
            let alert = await page.alertSuccess();
            console.log("alert text: " + alert);
            assert.include(alert, 'Thank you', 'The text is wrong!');
        });

        after(async function () {
            await page.quit();
        });
    })
});