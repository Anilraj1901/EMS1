module.exports = (sequelize, Sequelize) => {
	const employeerole = sequelize.define("employeerole", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		
		role: {
			type: Sequelize.STRING
		},
		menu: {
			type: Sequelize.JSON
		},
	},
		{
			classMethods: {
				associate: function (models) {
					employeerole.hashMany(models.employee)
				}
			}
		})

	return employeerole;
};

