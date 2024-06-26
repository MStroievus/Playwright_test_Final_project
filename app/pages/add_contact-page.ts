import { test } from '@playwright/test';
import { PageUrl } from "../utils/constants/pages";
import { AddContactPageModel } from "../utils/model/add_contact_page-model";
import { BasePage } from "./base-page";

export class AddContactPage extends BasePage {
  public readonly pagePath: PageUrl.addContactPage;
  public readonly submitButton = this.page.getByRole('button', { name: "Submit" }) // інший спосіб локатора

  async fillForm(data: AddContactPageModel) {
    await test.step(`Fill Add Contact form with ${data}`, async () => {
      await this.getPlaceholderByName('First Name').fill(data.firstName);
      await this.getPlaceholderByName('Last Name').fill(data.lastName);
      await this.getPlaceholderByName('yyyy-MM-dd').fill(data.birthdate);
      await this.getPlaceholderByName('example@email.com').fill(data.email);
      await this.getPlaceholderByName('8005551234').fill(data.phone.toString());
      await this.getPlaceholderByName('Address 1').fill(data.street1);
      await this.getPlaceholderByName('Address 2').fill(data.street2);
      await this.getPlaceholderByName('City').fill(data.city);
      await this.getPlaceholderByName('State or Province').fill(data.stateProvince);
      await this.getPlaceholderByName('Postal Code').fill(data.postalCode.toString());
      await this.getPlaceholderByName('Country').fill(data.country);
    });
  }
}