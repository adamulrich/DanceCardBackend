// set this so that tests can test.
process.env.ENV_DEV = true;

const stakeExample = require('../models/stake').stakeExample;

const server = require("../server").server;

const request = require("supertest");
const exp = require("constants");
let testStake = stakeExample;

//////////////////////////////////////// ROUTE/CONTROLLER TESTS

///////////////// USER ROUTE
describe("Stake route test", function () {
	

	test("create/read/update/delete stake", async () => {

		// change name
		testStake.name = "test stake"

		// change  and save
		const resCorrect = await request(server)
			.post('/stake')
			.send(testStake);

		// verify creation
		expect(resCorrect.statusCode).toEqual(201);

		const stakeId = resCorrect.body.stakeId;
		testStake.stakeId = stakeId;
		// get stake
		let res = await request(server)
			.get(`/stake/${stakeId}`);
		
		// verify
		expect(res.statusCode).toEqual(200)
		expect(res.body.name).toEqual(testStake.name);
		expect(res.body.stakeId).toEqual(testStake.stakeId);
		expect(res.body.regionId).toEqual(testStake.regionId);
		expect(res.body.stakeId).toEqual(testStake.stakeId);

		// make a change
		testStake.name = "test update to stake";

		const resPass = await request(server)
		.put(`/stake/${stakeId}`)
		.send(testStake)

		// verify
		expect(resPass.statusCode).toEqual(200)

		// get stake
		res = await request(server)
		.get(`/stake/${stakeId}`);
		
		// verify
		expect(res.statusCode).toEqual(200)
		expect(res.body.name).toEqual(testStake.name);
		expect(res.body.stakeId).toEqual(testStake.stakeId);
		expect(res.body.regionId).toEqual(testStake.regionId);
		expect(res.body.stakeId).toEqual(testStake.stakeId);


		// delete stake
		res = await request(server)
			.delete(`/stake/${stakeId}`)

		//verify
		expect(res.statusCode).toEqual(200);

		// get stake
		res = await request(server)
		.get(`/stake/${stakeId}`);

		//verify
		expect(res.statusCode).toEqual(404)

	});
})

server.close();
