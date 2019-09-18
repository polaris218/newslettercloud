class AddRentalPage:
    def __init__(self, browser, url=None):
        self.browser = browser
        if url:
            self.browser.visit(url)

    @property
    def driver(self):
        return self.browser.driver

    @property
    def add_button(self):
        return self.browser.find_by_xpath("//button[@class='sc-htpNat uodbo sc-bwzfXH eMrCYI']")

    @property
    def category(self):
        return self.browser.find_by_xpath("//body/div[@id='root']/div[@class='sc-csuQGl bPbGIR']/div[@class='MuiGrid-container-1 MuiGrid-wrap-xs-nowrap-7 MuiGrid-justify-xs-space-between-20 sc-csuQGl edEIIY']/div[@class='relative sc-krDsej fFGxyc']/div[@class='MuiGrid-container-1 MuiGrid-direction-xs-column-4 full-height sc-csuQGl fQdNLn']/div[@class='sc-fQejPQ bdtaON']/div[@class='sc-etwtAo kAcWtg']/div/div/div[@class='sc-csuQGl huvrJe']/div[@class='MuiGrid-container-1 sc-csuQGl jiMZzk']/div[@class='MuiGrid-item-2 MuiGrid-grid-xs-12-39 MuiGrid-grid-lg-6-72 sc-csuQGl cTcXIG']/div[3]/div[1]")

