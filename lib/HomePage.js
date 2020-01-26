let BasePage = require('./BasePage');

class HomePage extends BasePage {

    async requestBtn() {
        await this.write('input', 'user@chch.com');
        return {
            opacity: await this.find('.btn-lg').then(async (elem) => await elem.getCssValue('opacity')),
            state: await this.find('.btn-lg').then(async (elem) => await elem.isEnabled())
        }
    }

    async clickSubmit() {
        await this.find('.btn-lg').then(async (el) => {
            await this.driver.executeScript("document.querySelectorAll('.btn-lg')[0].click();");//.then(() =>{console.log("I've clicked the button!!!")});
            //await el.click(); //Doesn't work in Safari
            await el.getText().then((txt) => {
                console.log('Button text: ' + txt)
            });
        });
    };

    async alertSuccess() {
        await this.requestBtn();
        await this.clickSubmit();
        return await this.find('.alert-success').then(async (el) => {
            return await el.getText()
        });
    };
}

module.exports = HomePage;