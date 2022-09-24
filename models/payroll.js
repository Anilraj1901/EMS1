module.exports = (sequelize, Sequelize) => {
	const payroll = sequelize.define("payroll", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
        department: {
			type: Sequelize.STRING
		},
		role: {
			type: Sequelize.STRING
		},
		timeperiod: {
			type: Sequelize.INTEGER
		},
        amount: {
			type: Sequelize.INTEGER
		},
        totalamount: {
			type: Sequelize.INTEGER
		},
	},
		)

	return payroll;
};

