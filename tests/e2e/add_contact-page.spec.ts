import { test, expect } from '@playwright/test';
import { AddContactPage } from '../../app/pages/add_contact-page';
import { formsData } from '../../utils/model/add_contact_page-model';
import { PageUrl } from '../../utils/constants/pages';
import { LoginPage } from '../../app/pages/login-page';
import { ContactList } from '../../app/pages/contact_list-page';

test.describe('Add contact', () => {
  test.only(
    'Update contact',
    {
      tag: ['@e2e', '@regression', '@smoke']
    },
    async ({ page }) => {
      await page.goto(PageUrl.homePage);
      const loginPage = new LoginPage(page);
      const contactList = new ContactList(page);
      await loginPage.fillForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
      await loginPage.getButtonByName('Submit').click();
      await contactList.addANewContactButton.click();
      const addContactPage = new AddContactPage(page);
      await addContactPage.fillForm(formsData);
      await addContactPage.submitButton.click();
    }
  );
});
