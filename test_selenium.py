# test_selenium.py
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

# === CONFIGURATION ===
website_path = r"C:\Users\aayus\OneDrive\Desktop\web\ayu\ak\indexamazon.html"
website_url = "file:///" + website_path.replace("\\", "/")

# === ENABLE BROWSER CONSOLE LOG CAPTURE ===
options = Options()
options.add_argument("--start-maximized")
options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

# === SETUP CHROME DRIVER ===
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

print("🚀 Opening your website...")
driver.get(website_url)
time.sleep(2)

# === INJECT JAVASCRIPT TO TRACK CLICKS ===
click_logger_script = """
document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', e => {
        console.log("USER_CLICKED:" + (el.innerText || el.id || el.className || 'Unnamed Element'));
    });
});
console.log("✅ Click tracker ready — click any button or link!");
"""
driver.execute_script(click_logger_script)
print("🧠 Manual Test Mode Started — Click buttons or links in the browser window.\n")
print("Type Ctrl+C in terminal when you're done.\n")

try:
    while True:
        time.sleep(1)
        logs = driver.get_log("browser")
        for log in logs:
            if "USER_CLICKED:" in log["message"]:
                msg = log["message"].split("USER_CLICKED:")[1]
                print(f"✅ You clicked: {msg.strip()}")

except KeyboardInterrupt:
    print("\n🛑 Test ended by user.")
finally:
    driver.quit()
    print("✅ Browser closed successfully.")
