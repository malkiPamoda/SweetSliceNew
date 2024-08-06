import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/edge'; // Use this if supported or skip this import
import { strict as assert } from 'assert';
import path from 'path';


    // Specify the path to the Edge WebDriver executable
    
    (async function authTests() {
        // Edge WebDriver path configuration
        const edgeDriverPath = 'C:/Users/User/Downloads/edgedriver_win64/msedgedriver.exe'; // Make sure this path is correct
    
        // Create an instance of Edge Options
        const options = new Options();
        options.setEdgeDriverPath(edgeDriverPath); // Specify the path to your Edge WebDriver
        options.addArguments('--start-maximized'); // Optional: start browser maximized
        // options.addArguments('--headless'); // Optional: run in headless mode
    
        // Create a new Edge WebDriver instance
        let driver = await new Builder()
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options) // Ensure this method exists
            .build();
    
        try {
            // Test Registration
            await driver.get('http://localhost:5173'); // Adjust URL to where the React app is running
    
            // Open Registration Popup
            await driver.findElement(By.css('button[data-testid="open-register-popup"]')).click(); // Update selector as necessary
    
            // Fill out the registration form
            await driver.findElement(By.name('firstName')).sendKeys('John');
            await driver.findElement(By.name('lastName')).sendKeys('Doe');
            await driver.findElement(By.name('email')).sendKeys('john.doe@example.com');
            await driver.findElement(By.name('password')).sendKeys('password123');
            await driver.findElement(By.name('confirmPassword')).sendKeys('password123');
            await driver.findElement(By.css('button[type="submit"]')).click();
    
            // Wait for successful registration response and verify
            await driver.wait(until.elementLocated(By.css('.success-message')), 10000); // Update selector as necessary
            let successMessage = await driver.findElement(By.css('.success-message')).getText();
            assert.strictEqual(successMessage, 'Registration successful!'); // Update message as necessary
    
            // Test Login
            await driver.get('http://localhost:5173'); // Adjust URL to where the React app is running
    
            // Open Login Popup
            await driver.findElement(By.css('button[data-testid="open-login-popup"]')).click(); // Update selector as necessary
    
            // Fill out the login form
            await driver.findElement(By.name('email')).sendKeys('john.doe@example.com');
            await driver.findElement(By.name('password')).sendKeys('password123');
            await driver.findElement(By.css('button[type="submit"]')).click();
    
            // Wait for successful login response and verify
            await driver.wait(until.elementLocated(By.css('.dashboard')), 10000); // Update selector as necessary
            let dashboard = await driver.findElement(By.css('.dashboard')).getText();
            assert.ok(dashboard.includes('Welcome back, John Doe!')); // Update text as necessary
    
        } catch (error) {
            console.error('Test failed', error);
        } finally {
            await driver.quit();
        }
    })();