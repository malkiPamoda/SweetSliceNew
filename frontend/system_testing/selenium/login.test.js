import { describe, it, expect, beforeAll, afterAll} from 'vitest';
import { Builder, By, until } from 'selenium-webdriver';
import edge from 'selenium-webdriver/edge.js';


describe('Login Popup System Test', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--headless'); 
    driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
  }, 10000); 

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should show login popup and successfully log in', async () => {
    if (!driver) {
      throw new Error('WebDriver not initialized');
    }

 
    await driver.get('http://localhost:5173');

 
    const loginButton = await driver.findElement(By.id('loginbutton')); 
    await loginButton.click();

    await driver.wait(until.elementLocated(By.css('.popup')), 5000);

    const emailInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('password'));
    await emailInput.sendKeys('test@example.com');
    await passwordInput.sendKeys('password123');

 
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();


    const successMessage = await driver.wait(until.elementLocated(By.css('.text-green-500')), 5000);
    const successText = await successMessage.getText();

    expect(successText).toBe('Login successful!');
  }, 30000);
});