// set this so that tests can test.
process.env.ENV_DEV = true;

const stakeModel = require('../models/stake').stakeModel;
const wardModel = require('../models/ward').wardModel;

const userExample = require('../models/user').userExample;

const server = require("../server").server;

const request = require("supertest");
const exp = require("constants");
const newUser = userExample;

//////////////////////////////////////// ROUTE/CONTROLLER TESTS

///////////////// USER ROUTE
describe("User route test", function () {

	
	// CREATE SHOULD FAIL
	test("create fail", async () => {
		// should fail , duplicate email
		const resFail = await request(server)
			.post('/user')
			.send(newUser)
		expect(resFail.statusCode).toEqual(422);

	})
	
	server.close();

	// UPDATE SHOULD FAIL
	test("update fail", async () => {
		// should fail, nothing to update
		const resFail = await request(server)
			.put(`/user/${newUser.email}`)
			.send(newUser)
		expect(resFail.statusCode).toEqual(417);

	})

	server.close();

	// DELETE SHOULD FAIL

	test("delete fail", async () => {
		// should fail, not found
		const badEmail = "foo@bar.org";
		const resFail = await request(server)
			.delete(`/user/${badEmail}`)
		expect(resFail.statusCode).toEqual(404);

	})
	

	test("create/read/update/delete user", async () => {

		// CREATE USER
		const stakeResult = await stakeModel.findOne({ stakeId: newUser.stakeId });
		const wardResult = await wardModel.findOne({ wardId: newUser.wardId });

		// change email and save
		newUser.email = "sara.johnson@hotmail.com";

		const resCorrect = await request(server)
			.post('/user')
			.send(newUser)

		expect(resCorrect.statusCode).toEqual(201)

		// GET USER
		let res = await request(server)
			.get(`/user/${newUser.email}`);
		
		expect(res.statusCode).toEqual(200)
		expect(res.body.name).toEqual(newUser.name);
		expect(res.body.stakeName).toEqual(stakeResult.name);
		expect(res.body.wardName).toEqual(wardResult.name);
		expect(res.body.phone).toEqual(newUser.phone);
		expect(res.body.email).toEqual(newUser.email);
		expect(res.body.parentPhone).toEqual(newUser.parentPhone);
		expect(res.body.parentName).toEqual(newUser.parentName);
		expect(new Date(res.body.expirationDate).toDateString()).toEqual(new Date(newUser.expirationDate).toDateString());
		expect(res.body.cardIsSigned).toEqual(newUser.cardIsSigned);
		expect(res.body.regionId).toEqual(newUser.regionId);
		expect(res.body.regionAdmin).toEqual(newUser.regionAdmin);


		newUser.name = "Sarah Johnson";
		const email = newUser.email;
		newUser.email = "sarah.johnson@hotmail.com";

		const resPass = await request(server)
		.put(`/user/${email}`)
		.send(newUser)
		expect(resPass.statusCode).toEqual(200)

		// GET USER
		res = await request(server)
			.get(`/user/${newUser.email}`);
		
		expect(res.statusCode).toEqual(200)
		expect(res.body.name).toEqual(newUser.name);
		expect(res.body.stakeName).toEqual(stakeResult.name);
		expect(res.body.wardName).toEqual(wardResult.name);
		expect(res.body.phone).toEqual(newUser.phone);
		expect(res.body.email).toEqual(newUser.email);
		expect(res.body.parentPhone).toEqual(newUser.parentPhone);
		expect(res.body.parentName).toEqual(newUser.parentName);
		expect(new Date(res.body.expirationDate).toDateString()).toEqual(new Date(newUser.expirationDate).toDateString());
		expect(res.body.cardIsSigned).toEqual(newUser.cardIsSigned);
		expect(res.body.regionId).toEqual(newUser.regionId);
		expect(res.body.regionAdmin).toEqual(newUser.regionAdmin);

		// DELETE USER
		res = await request(server)
			.delete(`/user/${newUser.email}`)
		expect(res.statusCode).toEqual(200);

		// GET USER
		res = await request(server)
			.get(`/user/${newUser.email}`);

		expect(res.statusCode).toEqual(404)

	});
})

server.close();
