class LoginPage:
    def __init__(self, browser):
        self.browser = browser

    def visit(self):
        self.browser.visit('https://gan.inprogress.rocks/auth/signin')

    @property
    def driver(self):
        return self.browser.driver

    @property
    def email_input(self):
        return self.browser.find_by_id('email')

    @property
    def password_input(self):
        return self.browser.find_by_name('password')

    @property
    def login_button(self):
        return self.browser.find_by_xpath("//button[@type='submit']")

    @property
    def mails_tab(self):
        return self.browser.find_by_xpath("//ul[@class='navbar-nav mr-auto']//li[3]//a[1]")

    @property
    def actions(self):
        return self.browser.find_by_xpath("//tbody//tr[1]//td[3]//div[1]//div[1]//button[1]")

    @property
    def send(self):
        return self.browser.find_by_xpath("//*[contains(text(),'Prepare to send')]")

    @property
    def out_news(self):
        return self.browser.find_by_xpath("//div[@class='card-deck']//div[2]//div[2]//a[1]")

    @property
    def choose_list(self):
        return self.browser.find_by_xpath("//body/div[@id='root']/div[@class='container relative']/form/div[@class='row']/div[@class='col-8 offset-2']/div[@class='card mb-4']/div[@class='card-body']/div[@class='control-field']/div[@class='control-element']/div[@class='css-10nd86i react-select false']")

    @property
    def subject(self):
        return self.browser.find_by_name("subject")

    @property
    def sender(self):
        return self.browser.find_by_xpath("//div[@class='form-group mb-0']//div[@class='css-1hwfws3']")

    @property
    def analytics(self):
        return self.browser.find_by_xpath("//label[@class='custom-control-label']")

    @property
    def send_mail(self):
        return self.browser.find_by_xpath("//button[@type='submit']")

    @property
    def sent_mails_tab(self):
        return self.browser.find_by_xpath("//span[contains(text(),'Sent mails')]")

    @property
    def subject_in_table(self):
        return self.browser.find_by_xpath("//tbody//tr[1]//td[1]")
