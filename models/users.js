"use strict";

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    //MLH Data
    id: {type: DataTypes.INTEGER, primaryKey: true},
    first_name: {type: DataTypes.STRING, notNull: true},
    last_name: {type: DataTypes.STRING, notNull: true},
    graduation: {type: DataTypes.DATE, notNull: true},
    major: {type: DataTypes.STRING, notNull: true},
    shirt_size: {type: DataTypes.STRING, notNull: true},
    date_of_birth: {type: DataTypes.DATE, notNull: true},
    diet: DataTypes.STRING,
    special_needs: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    school: DataTypes.STRING,
    email: DataTypes.STRING,

    //Custom Data
    resume: DataTypes.BLOB,
    //teamates: DataTypes.STRING,
    first_hack: DataTypes.BOOLEAN,
    sms_notify: DataTypes.BOOLEAN,

    //Internal
    status: {type: DataTypes.STRING, defaultValue: 'confirmed'},
    travel: DataTypes.STRING,
    how: DataTypes.STRING
  });

  return Users;
};
