
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Demos', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    demoTitle: {
      type: Sequelize.STRING,
    },
    demoSlug: {
      type: Sequelize.STRING,
      unique: true,
    },
    demoText: {
      type: Sequelize.TEXT,
    },
    demoDate: {
      type: Sequelize.DATE,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Demos'),
};
