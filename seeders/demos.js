const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies
const changeCase = require('change-case');

const demosList = [];

for (let i = 0; i < 2; i++) { // eslint-disable-line no-plusplus
  const title = faker.lorem.sentence(5);
  const demoObj = {
    id: faker.random.number(100000),
    demoTitle: title,
    demoSlug: `${changeCase.paramCase(title)}-${Date.now()}`,
    demoDate: new Date(),
    demoText: faker.lorem.sentences(3, 3),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  demosList.push(demoObj);
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Demos', demosList, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Demos', null, {});
  },
};
