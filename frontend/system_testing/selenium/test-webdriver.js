// test-webdriver.js
import { Builder } from 'selenium-webdriver';
import edge from 'selenium-webdriver/edge.js';

async function testWebDriver() {
  let driver;
  try {
    const options = new edge.Options();
    options.addArguments('--headless'); // Correctly add headless argument for Edge
    driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
    console.log('WebDriver initialized successfully');
    await driver.quit();
  } catch (error) {
    console.error('Error initializing WebDriver:', error);
  }
}

testWebDriver();