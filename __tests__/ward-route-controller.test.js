// set this so that tests can test.
process.env.ENV_DEV = true;

const wardExample = require('../models/ward').wardExample;

const server = require("../server").server;

const request = require("supertest");
const exp = require("constants");
let testWard = wardExample;

//////////////////////////////////////// ROUTE/CONTROLLER TESTS

///////////////// USER ROUTE
describe("Ward route test", function () {
	

	test("create/read/update/delete ward", async () => {

		// change name
		testWard.name = "test ward"

		// change  and save
		const resCorrect = await request(server)
			.post('/ward')
			.send(testWard);

		// verify creation
		expect(resCorrect.statusCode).toEqual(201);

		const wardId = resCorrect.body.wardId;
		testWard.wardId = wardId;
		// get ward
		let res = await request(server)
			.get(`/ward/${wardId}`);
		
		// verify
		expect(res.statusCode).toEqual(200)
		expect(res.body.name).toEqual(testWard.name);
		expect(res.body.wardId).toEqual(testWard.wardId);
		expect(res.body.regionId).toEqual(testWard.regionId);
		expect(res.body.stakeId).toEqual(testWard.stakeId);

		// make a change
		testWard.name = "test update to ward";

		const resPass = await request(server)
		.put(`/ward/${wardId}`)
		.send(testWard)

		// verify
		expect(resPass.statusCode).toEqual(200)

		// get ward
		res = await request(server)
		.get(`/ward/${wardId}`);
		
		// verify
		expect(res.statusCode).toEqual(200)
		expect(res.body.name).toEqual(testWard.name);
		expect(res.body.wardId).toEqual(testWard.wardId);
		expect(res.body.regionId).toEqual(testWard.regionId);
		expect(res.body.stakeId).toEqual(testWard.stakeId);


		// delete ward
		res = await request(server)
			.delete(`/ward/${wardId}/region/${testWard.regionId}`)

		//verify
		expect(res.statusCode).toEqual(200);

		// get ward
		res = await request(server)
		.get(`/ward/${wardId}`);

		//verify
		expect(res.statusCode).toEqual(404)

	});
})

server.close();
