
"use strict";
var sequelize = require('../index');
var bcrypt = require('bcryptjs');
module.exports = (sequelize, Sequelize) => {
	const employee = sequelize.define("employee", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
		},
		firstname: {
			type: Sequelize.STRING
		},
		lastname: {
			type: Sequelize.STRING
		},
		address: {
			type: Sequelize.STRING
		},
		address2 : {
			type: Sequelize.STRING
		},
		department: {
			type: Sequelize.STRING
		},
		mobilenumber: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		role_id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
	},
		{
			classMethods: {
				hash: function (password, callback) {
					console.log(password);
					bcrypt.genSalt(11, function (err, salt) {
						if (err) {
							callback(err, null);
						} else {
							bcrypt.hash(password, salt, function (err, hash) {
								if (err) {
									callback(err, null);
								} else {
									callback(null, hash.toString('hex'));
								}
							});
						}
					});
				},
				checkPassword: function (password, hash, callback) {
					bcrypt.compare(password, hash, function (err, matched) {
						callback(err, matched);
					})
				},
				associate: function (models) {
					employee.belongsTo(models.employeerole)
				}
			 } 
		},
      
    )
return employee;
  };

