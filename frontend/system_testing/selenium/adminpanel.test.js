import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Builder, By, until } from 'selenium-webdriver';
import edge from 'selenium-webdriver/edge.js';

const options = new edge.Options().headless();

describe('AdminPanel System Test', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(options)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should render loading state', async () => {
    await driver.get('http://localhost:3000'); 

   
    await driver.get('http://localhost:3000/admin'); 

    const loadingText = await driver.findElement(By.css('.loading-text')).getText();
    expect(loadingText).toBe('Loading...');
  });

  it('should render access denied for non-admin users', async () => {
   
    await driver.get('http://localhost:3000/login'); 
    await driver.findElement(By.css('.email-input')).sendKeys('nonadmin@example.com'); 
    await driver.findElement(By.css('.password-input')).sendKeys('password123'); 
    await driver.findElement(By.css('.login-button')).click(); 

    await driver.get('http://localhost:3000/admin'); 

    const accessDeniedText = await driver.findElement(By.css('.access-denied')).getText(); 
    expect(accessDeniedText).toBe('Access Denied. Admins only.');
  });

  it('should render admin panel for admin users', async () => {
    await driver.get('http://localhost:3000/login'); 
    await driver.findElement(By.css('.email-input')).sendKeys('admin@example.com'); 
    await driver.findElement(By.css('.password-input')).sendKeys('password123'); 
    await driver.findElement(By.css('.login-button')).click(); 

  
    await driver.get('http://localhost:3000/admin'); 

    const adminPanelText = await driver.findElement(By.css('.admin-panel')).getText(); 
    expect(adminPanelText).toBe('Admin Panel');
  });

  it('should add a product', async () => {
    await driver.get('http://localhost:3000/login'); 
    await driver.findElement(By.css('.email-input')).sendKeys('admin@example.com'); 
    await driver.findElement(By.css('.password-input')).sendKeys('password123'); 
    await driver.findElement(By.css('.login-button')).click(); 

    await driver.get('http://localhost:3000/admin'); 

    await driver.findElement(By.css('.add-product-button')).click(); 
    const productText = await driver.findElement(By.css('.product-name')).getText(); 
    expect(productText).toBe('New Product');
  });

  it('should delete a product', async () => {
    await driver.get('http://localhost:3000/login'); 
    await driver.findElement(By.css('.email-input')).sendKeys('admin@example.com'); 
    await driver.findElement(By.css('.password-input')).sendKeys('password123'); 
    await driver.findElement(By.css('.login-button')).click(); 
    await driver.get('http://localhost:3000/admin'); 

    await driver.findElement(By.css('.add-product-button')).click(); 
    await driver.findElement(By.css('.delete-product-button')).click(); 

    const productElement = await driver.findElements(By.css('.product-name')); 
    expect(productElement.length).toBe(0);
  });
});