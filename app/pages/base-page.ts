import { APIRequestContext, Page } from "@playwright/test";
import { IPage } from "../../utils/types/web/pages/page";

export abstract class BasePage implements IPage {
  abstract readonly pagePath: string;

  constructor(public page: Page, context?: APIRequestContext) { }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

}
