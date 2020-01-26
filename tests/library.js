require('chromedriver');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    Browser = webdriver.Browser,
    {suite, ignore} = require('selenium-webdriver/testing');
const { describe, before, it, after} = require("mocha");


/*var mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        reportFilename: 'customReportFilename',
        quiet: true
    }
});*/

suite(function (env) {
    ignore(env.browsers(Browser.SAFARI)).describe("Registration", function () {
        let driver;
        this.timeout(0);

        before(async function () {
            driver = await new webdriver.Builder().forBrowser('chrome').build();
            await driver.manage().setTimeouts({implicit: 10000, pageLoad: 10000, script: 0});
        });

        it("First test", async function () {
            await driver.get('http://library-app.firebaseapp.com');
            let submitBtn = driver.findElement(By.css('.btn-lg'));
            await driver.findElement(By.css('input')).sendKeys('user@chch.com');

            await driver.wait(function () {
                return submitBtn.getCssValue("opacity").then((result) => {
                    return result == 1;
                });
            }, 10000, "Button isn't enabled");

            await submitBtn.click();

            await driver.wait(until.elementLocated(By.css('.alert-success')), 10000, "Success message didn't appear")
                .then(function (value) {
                    value.getText().then(function (txt) {
                        console.log("Alert success text is: " + txt);
                    });
                });

        });

        after(async function () {
            await driver.quit();
        });
    })
});


/*
var driver = new webdriver.Builder().forBrowser('chrome').build();

init();

async function init() {
    driver.get('http://library-app.firebaseapp.com');

    var submitBtn = driver.findElement(By.css('.btn-lg'));
    driver.findElement(By.css('input')).sendKeys('user@chch.com');

/!*    await driver.wait(function () {
        return submitBtn.isEnabled();
    }, 10000, "Button isn't enabled");*!/

    await driver.wait(function () {
        return submitBtn.getCssValue("opacity").then((result) => {
            return result == 1;
        });
    }, 10000, "Button isn't enabled");

    await submitBtn.click();

/!*    driver.wait(until.elementLocated(By.css('.alert-success')), 10000, "Success message didn't appear")
        .then(function () {
            driver.findElement(By.css('.alert-success')).getText().then(function (txt) {
                console.log("Alert success text is: " + txt);
            });
        });*!/

    driver.wait(until.elementLocated(By.css('.alert-success')), 10000, "Success message didn't appear")
        .then(function (value) {
            value.getText().then(function (txt) {
                console.log("Alert success text is: " + txt);
            });
        });


}
*/


/*async function init() {
    await driver.manage().setTimeouts({implicit: 10000, pageLoad: 10000, script: 0}).then(async () => {
        console.log("jgyhg111");
        await driver.manage().getTimeouts().then(function (value) {
            console.log("Timeout :" + value.implicit);
        });
    });
    console.log("jgyhg");
    await driver.get('http://library-app.firebaseapp.com').then(() => {
        console.log("jgyhgfesfsfes2222222");
    });
    console.log("jgyhgfesfsfes");
    await driver.findElement(By.css('input')).sendKeys('user@email.com');

    await driver.findElement(By.css('.btn-lg')).click();

    driver.findElement(By.css('.alert-success')).getText().then(function (txt) {
        console.log("Alert success text is: " + txt);
    })
}*/

/*
//Example of several Promises
var p = driver.sleep(10000);
var p1 = driver.sleep(5000);
Promise.all([p,p1]).then(function () {
        console.log("Alert success: ");
        driver.findElement(By.css('.alert-success')).getText().then(function (txt) {
            console.log("Alert success text is: " + txt);
        });
    }
);*/

/*driver.sleep(10000).then(function () {
        driver.findElement(By.css('.alert-success')).getText().then(function (txt) {
            console.log("Alert success text is: " + txt);
        });
    }
);*/




/*driver.findElement(By.css('input')).then(function(el){
    console.log("success " + el);
})
driver.findElement(By.css('.btn-lg')).getText().then(function (txt) {
    console.log("The text of the button is: " + txt);
});
//driver.findElements(By.css('.alert-success'));
driver.findElements(By.css('nav li')).then(function (elements) {
    elements.map(function (el) {
        el.getText().then(function (txt) {
            console.log('The text of the navbar element is: ' + txt);
        })
    })
});*/

//driver.quit();