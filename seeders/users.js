const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

const usersList = [];

for (let i = 0; i < 6; i++) { // eslint-disable-line no-plusplus
  const userObj = {
    id: faker.random.uuid(),
    userEmail: faker.internet.email(),
    userPass: bcrypt.hashSync('passwrod', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  usersList.push(userObj);
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', usersList.concat([{
    id: faker.random.uuid(),
    userEmail: 'user@email.com',
    userPass: bcrypt.hashSync('passwrod', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }]), {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
