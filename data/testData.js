import {fa} from "@faker-js/faker";

const {faker} = require('@faker-js/faker');

export const newUser1 = {
    firstName : faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    city: faker.location.city(),
    country: 'Ukraine',
    phoneNumber: '+380977777322',
    street: faker.location.street(),
    zipCode: '67771',
}

export const cardData = {
    cardNumber: process.env.CARD_NUMBER,
    cardDate: process.env.CARD_DATE,
    cardCVV: faker.finance.creditCardCVV(),
}

export const apiDataPost = {
    title: 'Hello World',
    body: 'Test body',
    userId: 1,
}

export const apiDataPatch = {
    title: 'Hello AQA',
}