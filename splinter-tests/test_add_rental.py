import pytest
from splinter import Browser
from selenium.webdriver.common.keys import Keys
from time import sleep

from login_page import LoginPage


@pytest.fixture
def browser():
    instance = Browser('chrome', headless=False)
    instance.driver.maximize_window()
    instance.driver.implicitly_wait(10)
    return instance


def test_login_page(browser):
    # Test verifies the
    page_log = LoginPage(browser, 'https://gan.inprogress.rocks/auth/signin')
    browser.visit("https://gan.inprogress.rocks/auth/signin")

    page_log.email_input.click()
    page_log.email_input.fill("simon.wallstrom@gmail.com")
    page_log.password_input.click()
    page_log.password_input.fill("qwerty")
    page_log.login_button.click()
    sleep(3)

