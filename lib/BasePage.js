require('chromedriver');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    Browser = webdriver.Browser;

let chrome = require("selenium-webdriver/chrome");
let o = new chrome.Options();
o.addArguments('disable-infobars');
o.addArguments('ignoreSynchronization');

class BasePage {

    async initDriver(currentBrowser) {

        if (currentBrowser.name === Browser.CHROME) {
            this.driver = await new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.chrome())
                .setChromeOptions(o)
                .build();
        }
        if (currentBrowser.name === Browser.SAFARI) {
            console.log(currentBrowser.name);
            this.driver = await new webdriver.Builder()
                .withCapabilities(webdriver.Capabilities.safari())
                .build();
        }
        if (this.driver !== undefined) {
            await this.driver.manage().window().setRect({x: 0, y: 0, width: 1200, height: 700});
            //await this.driver.manage().window().fullscreen();
        }
    };

    async visit(theURL) {
        return await this.driver.get(theURL);
    };

    async find(el) {
        this.driver.wait(until.elementLocated(By.css(el)), 5000);
        return await this.driver.findElement(By.css(el));
    };

    async write(el, txt) {
        return this.find(el).then((result) => {
            result.sendKeys(txt);
        });
    }

    async quit () {
        return await this.driver.quit();
    };
}

module.exports = BasePage;