const date = new Date();

module.exports = (sequelize, DataTypes) => {
  const Demo = sequelize.define('Demo', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    demoTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    demoSlug: {
      type: DataTypes.STRING,
    },
    demoText: {
      type: DataTypes.TEXT,
    },
    demoDate: {
      type: DataTypes.DATE,
      defaultValue: date,
      allowNull: false,
    },
  }, {});
  return Demo;
};
