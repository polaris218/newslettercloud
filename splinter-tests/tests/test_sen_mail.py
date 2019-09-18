import pytest
from splinter import Browser
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from time import sleep

from login_page import LoginPage


@pytest.fixture
def browser():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    instance = Browser('chrome', options=chrome_options)
    instance.driver.implicitly_wait(10)
    return instance


def test_send_mail(browser):
    # Test verifies the
    page = LoginPage(browser)
    page.visit()

    page.email_input.click()
    page.email_input.fill("simon.wallstrom@gmail.com")
    page.password_input.click()
    page.password_input.fill("qwerty")
    page.login_button.click()
    sleep(3)
    page.mails_tab.click()
    sleep(2)
    page.actions.click()
    sleep(2)
    page.send.click()
    sleep(2)
    page.out_news.click()
    sleep(2)
    page.choose_list.click()
    sleep(2)
    browser.driver.switch_to.active_element.send_keys(Keys.PAGE_UP)
    browser.driver.switch_to.active_element.send_keys(Keys.PAGE_UP)
    browser.driver.switch_to.active_element.send_keys(Keys.ENTER)
    sleep(2)
    page.subject.click()
    sleep(3)
    page.subject.fill('tm3')
    sleep(2)
    page.sender.click()
    browser.driver.switch_to.active_element.send_keys(Keys.PAGE_DOWN)
    browser.driver.switch_to.active_element.send_keys(Keys.ENTER)
    sleep(2)
    page.analytics.click()
    sleep(1)
    page.send_mail.click()
    sleep(2)
    page.mails_tab.click()
    sleep(2)
    page.sent_mails_tab.click()
    sleep(2)
    assert page.subject_in_table.text == 'tm3'
