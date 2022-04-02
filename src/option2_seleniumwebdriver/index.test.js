const { Builder, By, until } = require('selenium-webdriver')
require('chromedriver')
jest.setTimeout(30000)

var url = 'http://localhost:3000';
var userName = 'Katharina_Bernier';
var password = 's3cret';
var newUsername = 'Adrian';
var newPassword = 'adrian';
var builder = new Builder().forBrowser('chrome')
var driver = builder.build()

// TODO: Complete the Login and Payment flow tests
it('Should be able to login with valid username and password', async () => {
    await driver.get(url)
    expect(await driver.getCurrentUrl()).toContain(url)
    await driver.findElement(By.id('username')).sendKeys(userName)
    await driver.findElement(By.id('password')).sendKeys(password)
    await driver.findElement(By.css('[data-test=signin-submit]')).click()
    await driver.wait(until.elementLocated(By.css('[data-test="nav-top-new-transaction"]'), 10000))
    

})

it('Should be able to make a new payment', async () => {
    await driver.findElement(By.css('[data-test="nav-top-new-transaction"]')).click()
    //Added this line because data-test="user-list-item-qywYp6hS0U was failing to be found.
    await driver.wait(until.elementLocated(By.css('[data-test="user-list-item-qywYp6hS0U"]'), 60000)) 
    await driver.findElement(By.css('[data-test="user-list-item-qywYp6hS0U"]')).click()
    await driver.findElement(By.id('amount')).sendKeys('100')
    await driver.findElement(By.id('transaction-create-description-input')).sendKeys('Testing')
    await driver.findElement(By.css('[data-test="transaction-create-submit-payment"]')).click()
    
})

it('Verify payment summary', async () => {
 
    await driver.findElement(By.xpath("//span[normalize-space()='Create Another Transaction']"))
    await driver.findElement(By.xpath("//span[normalize-space()='Return To Transactions']"))
})

it('Sign up Page', async () => {

    await driver.findElement(By.xpath("//span[normalize-space()='Logout']")).click()
   //I am clicking on the same element twice because of a page bug
    await driver.findElement(By.xpath("//a[@data-test='signup']")).click()
    await driver.findElement(By.xpath("//a[@data-test='signup']")).click()
    await driver.findElement(By.id('firstName')).sendKeys(newUsername)
    await driver.findElement(By.id('lastName')).sendKeys(newPassword)
    await driver.findElement(By.id('username')).sendKeys(newUsername)
    await driver.findElement(By.id('password')).sendKeys(newUsername)
    await driver.findElement(By.id('confirmPassword')).sendKeys(newUsername)
    await driver.findElement(By.xpath("//span[@class='MuiButton-label']")).click()

})
/*TO DO: - Verify search functions works
         - Verify request button works
         - Verify transactions has actually saved
         - Verify comment seciton works       
*/
