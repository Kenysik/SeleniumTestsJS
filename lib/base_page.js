require('chromedriver');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    Browser = webdriver.Browser;

var chrome = require("selenium-webdriver/chrome");
var o = new chrome.Options();
o.addArguments('disable-infobars');


let Page = function () {
    this.driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .setChromeOptions(o)
        .build();
    var driver = this.driver;
    driver.manage().window().setRect({x:1500, y: -500});

    this.visit = async function(theURL){
        return await driver.get(theURL);
    };

    this.quit = function () {
        return driver.quit();
    };

    this.find = async function (el) {
        driver.wait(until.elementLocated(By.css(el)), 5000);
        return await driver.findElement(By.css(el));
    };

    this.findAll = function (el) {
        driver.wait(until.elementLocated(By.css(el)), 5000);
        return driver.findElements(By.css(el));
    };

    this.write = async function(el, txt){
        return this.find(el).then((result)=>{
            result.sendKeys(txt);
        });
    }
};

module.exports = Page;