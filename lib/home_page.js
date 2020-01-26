var Page = require('./base_page');

Page.prototype.requestBtn = async function () {
    await this.write('input', 'user@chch.com');
    return{
        opacity: await this.find('.btn-lg').then(async (elem) => await elem.getCssValue('opacity')),
        state: await this.find('.btn-lg').then(async (elem) =>  await elem.isEnabled())
    }
};

Page.prototype.clickSubmit = async function () {
    return await this.find('.btn-lg').then(async (el) => {return await el.click()});
};

Page.prototype.alertSuccess = async function(){
    await this.requestBtn();
    await this.clickSubmit();
    return await this.find('.alert-success').then(async (el) => {return await el.getText()});
};

module.exports = Page;