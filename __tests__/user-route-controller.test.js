
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
	
	test("create/read user", async () => {

		// CREATE USER
		const stakeResult = await stakeModel.findOne({ stakeId: newUser.stakeId });
		const wardResult = await wardModel.findOne({ wardId: newUser.wardId });

		// change email and save
		newUser.email = "sara.johnson@hotmail.com";

		const resCorrect = await request(server)
			.post('/user')
			.send(newUser);

		expect(resCorrect.statusCode).toEqual(201)

		// GET USER
		const res = await request(server)
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
	});
})

server.close();

