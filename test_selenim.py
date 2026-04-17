from selenium import webdriver
from selenium.webdriver.common.by import By

# Initialize the driver (example with Chrome)
driver = webdriver.Chrome()

driver.get("https://example.com")

# Locate the element
element = driver.find_element(By.ID, "my-element-id")

# Get the text
text = element.text

# Compare the text
if text == "Expected Text":
    print("✅ Text matches exactly!")
else:
    print(f"❌ Text does not match. Found: {text}")

driver.quit()
