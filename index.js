const express = require('express');
const app = express();
var models = require('./models');
var bcrypt = require('bcryptjs');
const fs = require('fs');
// express.static(root, [options])
app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }))

const port = 3000;

app.get('/', (req, res) => {
	res.render('login',)
})

app.get('/home', (req, res) => {
	res.render('home',)
})

app.get('/dashboard', (req, res) => {
	res.render('dashboard',)
})

app.get('/register', (req, res) => {
	res.render('register',)
})

app.get('/excel', (req, res) => {
	res.render('excel',)
})
app.get('/userrole', (req, res) => {
	res.render('userrole',)
})
app.get('/payroll', (req, res) => {
	res.render('payroll',)
})
app.get('/check', (req, res) => {
	res.render('check',)
})


app.get('/crud', (req, res) => {
	res.render('crud',)
})
app.get('/role', (req, res) => {
	res.render('role',)
})

app.get('/payrolldashboard', (req, res) => {
	res.render('payrolldashboard',)
})
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});


// app.use();
const db = require("./models");
db.sequelize.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});



//api function
//list out a employeee
app.get('/employee', async (req, res) => {
	try {
		const employeelist = await models.employee.findAll();
		return res.send({ success: true, results: employeelist });
	} catch (error) {
		return res.send({ success: false, error: 'error fetching list' });
	}
})




//get employee using id
app.post('/employeegetbyid', async (req, res) => {
	try {
		let { id } = req.body;
		const employee = await models.employee.findOne(
			{ where: { id: id } });
		console.log(employee);
		res.status(200).json({ employee });
	} catch (error) {
		return res.send({ success: false, error: 'error getting employee by id' });
	}
})




//create a employee
app.post('/employee', async (req, res) => {
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let department = req.body.department;
	let mobilenumber = req.body.mobilenumber;
	let address = req.body.address;
	let address2 = req.body.address2;
	let email = req.body.email;
	const salt = bcrypt.genSaltSync(11);
	const hash = bcrypt.hashSync(req.body.password, salt);
	try {
		let abc = await models.employee.create({
			firstname: firstname,
			lastname: lastname,
			department: department,
			mobilenumber: mobilenumber,
			address: address,
			address2: address2,
			email: email,
			password: hash,

		});
		return res.render('login');
	}
	catch (error) {
		return res.send({ success: false, error: 'error at creating employee details' });
	}
})




//employee add
app.post('/employeeadd', async (req, res) => {
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let department = req.body.department;
	let mobilenumber = req.body.mobilenumber;
	let address = req.body.address;
	let address2 = req.body.address2;
	let email = req.body.email;
	const salt = bcrypt.genSaltSync(11);
	const hash = bcrypt.hashSync(req.body.password, salt);
	try {
		let abc = await models.employee.create({
			firstname: firstname,
			lastname: lastname,
			department: department,
			mobilenumber: mobilenumber,
			address: address,
			address2: address2,
			email: email,
			password: hash
		});
		return res.render('dashboard');
	}
	catch (error) {
		return res.send({ success: false, error: 'error at creating employee details' });
	}
})





//delete employee
app.delete('/employeeremove/:id', async (req, res) => {
	try {
		let { id } = req.body;
		console.log(id);
		const employeedelete = await models.employee.destroy({
			where: { id: id }
		});
		return res.send({ success: true, results: employeedelete });
	} catch (error) {
		return res.send({ success: false, error: 'error at employee remove' });
	}
})





//update employee 
app.put('/employeeupdate/:id', async (req, res) => {
	try {
		console.log(req.body)
		let { id, firstname, lastname, mobilenumber, department, address, address2,email, password } = req.body;
		const emp = await models.employee.update({ firstname: firstname, lastname: lastname, mobilenumber: mobilenumber,department: department, address: address,address2: address2,email: email,   password: password },
			{
				where: { id: id }
			});
	}
	catch (error) {
		return res.send({ success: false, error: 'error at employee update by id' });
	}
	console.log("employee updated successfully!!!");
	res.status(200);
})





//filtered by their dept
app.get('/filteringbydepartment', async (req, res) => {
	try {
		console.log("query params ==>", req.query)
		let department = req.query.department;
		console.log("department", department)
		const find = await models.employee.findAll({
			attributes: ['id', 'firstname', 'lastname', 'department', 'mobilenumber', 'address','address2', 'email', 'password'],
			where: { department: department }
		})
		return res.send({ success: true, results: find })
	} catch (error) {
		return res.send({ success: false, error: 'error at filtered by employee department' });
	}
})



//password aunthentication
app.post('/employeelogin', async (req, res) => {
	console.log(req.body);
	let email = req.body.email;
	let password = req.body.password;
	try {
		let emp = await models.employee.findOne({
			where: { email: email }
		})
		if (emp) {
			bcrypt.compare(password, emp.password, function (err, match) {
				console.log(match);
				if (match) {
					return res.send({ success: true, employee: emp })
				}
				else {
					return res.send({ success: false, error: "email or password  is wrong" })
				}
			})
		}
		else {
			return res.send({ success: false, error: "user is not registered...so please register and signin" })
		}
	}
	catch (error) {
		console.log(error);
		res.status(500).send(error)
	}
});



//create role
app.post('/employeerole', async (req, res) => {
	let role = req.body.role;
	let menu = req.body.menu;

	console.log(req.body.role)
	console.log(req.body.menu)
	try {
		let abc = await models.employeerole.create({
			role: role,
			menu: menu,
		});
		return res.render('dashboard');
	}
	catch (error) {
		return res.send({ success: false, error: 'error at creating employee details' });
	}
})


//delete role
app.delete('/employeeroleremove/:id', async (req, res) => {
	try {
		let { id } = req.body;
		console.log(id);
		const employeeroledelete = await models.employeerole.destroy({
			where: { id: id }
		});
		return res.send({ success: true, results: employeeroledelete });
	} catch (error) {
		return res.send({ success: false, error: 'error at employeerole remove' });
	}
})


//update role
app.put('/employeeroleupdate/:id', async (req, res) => {
	try {
		console.log(req.body)
		let { id, role, menu } = req.body;
		const emp = await models.employeerole.update({ role: role, menu: menu },
			{
				where: { id: id }
			});
	}
	catch (error) {
		return res.send({ success: false, error: 'error at employeerole update by id' });
	}
	console.log("employeerole updated successfully!!!");
	res.status(200);
})

//list role
app.get('/employeerolelist', async (req, res) => {
	try {
		const employeerolelist = await models.employeerole.findAll();
		return res.send({ success: true, results: employeerolelist });
		
	} catch (error) {
		return res.send({ success: false, error: 'error fetching employeerolelist' });
	}
})
//employeerole get by id  
app.post('/employeerolegetbyid', async (req, res) => {
	try {
		let { id } = req.body;
		const employeerole = await models.employeerole.findOne(
			{ where: { id: id } });
		console.log(employeerole);
		res.status(200).json({ employeerole });
	} catch (error) {
		return res.send({ success: false, error: 'error getting employeerole by id' });
	}
})



//create api for payroll
app.post('/payrollcreate', async (req, res) => {
	let department = req.body.department;
	let role = req.body.role;
	let timeperiod = req.body.timeperiod;
	let amount= req.body.amount;
	let totalamount = req.body.totalamount;
	try {
		let abc = await models.payroll.create({
			department: department,
			role: role,
			timeperiod: timeperiod,
			amount: amount,
			totalamount: totalamount,
		});
		return res.render('payrolldashboard');
	}
	catch (error) {
		return res.send({ success: false, error: 'error at creating payroll ' });
	}
})





//list api for payroll
app.get('/payrolllist', async (req, res) => {
	try {
		const payrolllist = await models.payroll.findAll();
		return res.send({ success: true, results: payrolllist });
		
	} catch (error) {
		return res.send({ success: false, error: 'error fetching payrolllist' });
	}
})








