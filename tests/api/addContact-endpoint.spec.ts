import { expect } from '@playwright/test';
import { AddContact } from '../../utils/types/api/endpoints/addContact';
import { addContactSchema } from '../../utils/schema/requestAPI/contact_request-schema';
import { ValidationAddContactResponseSchema as VAL } from '../../utils/schema/responseAPI/contact_response-schema';
import { test } from '../../app/fixture/combineFixture/contact-api-fixture';
import '../../utils/extensions/extensions-expect';

const contact: AddContact = {
  firstName: 'asd2ew123',
  lastName: 'Dowqe',
  birthdate: '1970-01-01',
  email: 'jdoe@fake.com',
  phone: 432847923,
  street1: '1 Main St.',
  street2: 'Apartment A',
  city: 'Anytown',
  stateProvince: 'KS',
  postalCode: 12345,
  country: 'USA'
};

const contactFirstName = {
  field: 'firstName',
  userData: {
    lastName: 'Dowqe',
    birthdate: '1970-01-01',
    email: 'jdoe@fake.com',
    phone: 432847923,
    street1: '1 Main St.',
    street2: 'Apartment A',
    city: 'Anytown',
    stateProvince: 'KS',
    postalCode: 12345,
    country: 'USA'
  }
};

const contactLastName = {
  field: 'lastName',
  userData: {
    firstName: 'Dowqe',
    birthdate: '1970-01-01',
    email: 'jdoe@fake.com',
    phone: 432847923,
    street1: '1 Main St.',
    street2: 'Apartment A',
    city: 'Anytown',
    stateProvince: 'KS',
    postalCode: 12345,
    country: 'USA'
  }
};

const fields = [contactLastName, contactFirstName];

test.describe('Add Contact endpoint', async () => {
  test(
    'Check status code Add Contact  endpoint with valid credentials',
    {
      tag: ['@smoke', '@api', '@regression']
    },
    async ({ contactAPIClient }) => {
      const response = await contactAPIClient.addContact(contact);

      expect(response).toHaveStatusCode(201);
      expect(response).toHaveStatusText('Created');

    }
  );

  test(
    'Check response Add Contact  endpoint with valid credentials',
    {
      tag: ['@smoke', '@api', '@regression']
    },
    async ({ contactAPIClient, validation }) => {
      const response = await contactAPIClient.addContact(contact);

      await validation.requestValidateSchema({ schema: addContactSchema, json: contact });
      await validation.responseValidationSchema({ schema: VAL.addContactResponseSchema(contact), response: response });

    }
  );

  for (let data of fields) {
    test(
      `Check status with missing ${data.field} name required field`,
      {
        tag: ['@api', '@regression']
      },
      async ({ contactAPIClient }) => {
        const response = await contactAPIClient.addContact(data.userData);

        expect(response).toHaveStatusCode(400);
        expect(response).toHaveStatusText('Bad Request');
      }
    );
  }

  for (let data of fields) {
    test(
      `Check response with missing ${data.field} name required field`,
      {
        tag: ['@api', '@regression']
      },
      async ({ contactAPIClient, validation }) => {
        const response = await contactAPIClient.addContact(data.userData);
        await validation.responseValidationSchema({
          schema: VAL.missingRequiredFieldErrorResponseSchema(data.field),
          response: response
        });
      }
    );
  }
});