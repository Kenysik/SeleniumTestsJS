require('chromedriver');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    Browser = webdriver.Browser,
    {suite, ignore} = require('selenium-webdriver/testing');
const { describe, before, it, after, beforeEach} = require("mocha");
const assert = require("assert");

var chrome = require("selenium-webdriver/chrome");
var o = new chrome.Options();
o.addArguments('disable-infobars');

suite(function (env) {
    ignore(env.browsers(Browser.SAFARI)).describe("Registration", function () {
        let driver;
        this.timeout(0);

        before(async function () {
            driver = await new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .setChromeOptions(o)
                .build();
            await driver.manage().window().setRect({x:1500, y: -500});
            await driver.manage().window().fullscreen();
            await driver.manage().setTimeouts({implicit: 10000, pageLoad: 10000, script: 0});
        });

        beforeEach(async function () {
            await driver.get('http://library-app.firebaseapp.com');
        });

        it("First test", async function () {
            let submitBtn = driver.findElement(By.css('.btn-lg'));
            await driver.findElement(By.css('input')).sendKeys('user@chch.com');

            return submitBtn.getCssValue("opacity").then((result) => {
                assert (result === '1');
            });
        });

        it("Second test", async function() {
            let submitBtn = driver.findElement(By.css('.btn-lg'));
            await driver.findElement(By.css('input')).sendKeys('user@chch.com');
            await submitBtn.click();

            await driver.wait(until.elementLocated(By.css('.alert-success')), 10000, "Success message didn't appear")
                .then(function (value) {
                    value.getText().then(function (txt) {
                        console.log("Alert success text is: " + txt);
                    });
                });
            await driver.findElements(By.css(".alert-success")).then(function (result) {
                assert.equal(result.length, 2, result.length + " messages were found");
            })
        });

        it('A nav bar should be shown', async function () {
            await driver.findElements(By.css('nav')).then(function (result) {
                assert.equal(result.length, 1, "Actually: " + result.length);
            })
        });

        after(async function () {
            await driver.quit();
        });
    })
});