// set this so that tests can test.
process.env.ENV_DEV = true;

const danceExample = require('../models/dance').danceExample;

const server = require("../server").server;

const request = require("supertest");
const exp = require("constants");
let testDance = danceExample;

//////////////////////////////////////// ROUTE/CONTROLLER TESTS

///////////////// USER ROUTE
describe("Dance route test", function () {
	const regionId = 1;

	test("getSchedule", async () => {
		let res = await request(server)
		.get(`/schedule/future/${regionId}`);
	
	// verify
	expect(res.statusCode).toEqual(200)
	});

	test("schedule/region", async () => {
		let res = await request(server)
		.get(`/schedule/region/${regionId}`);
	
	// verify
	expect(res.statusCode).toEqual(200)
	});

	test("create/read/update/delete dance", async () => {

		// change theme
		testDance.theme = "test dance"

		// change  and save
		const resCorrect = await request(server)
			.post('/schedule')
			.send(testDance);

		// verify creation
		expect(resCorrect.statusCode).toEqual(201);

		const danceId = resCorrect.body.id;
		testDance.id = danceId;
		// get dance
		let res = await request(server)
			.get(`/schedule/${danceId}`);
		
		// verify
		expect(res.statusCode).toEqual(200)
		expect(res.body.theme).toEqual(testDance.theme);
		expect(res.body.id).toEqual(testDance.id);
		expect(res.body.regionId).toEqual(testDance.regionId);
		expect(res.body.stakeHost).toEqual(testDance.stakeHost);
		expect(res.body.location).toEqual(testDance.location);

		// make a change
		testDance.location = "test update to ward";

		const resPass = await request(server)
		.put(`/schedule/${danceId}`)
		.send(testDance)

		// verify
		expect(resPass.statusCode).toEqual(200)

		// get dance
		res = await request(server)
		.get(`/schedule/${danceId}`);
		
		// verify
		expect(res.statusCode).toEqual(200)
		expect(res.body.theme).toEqual(testDance.theme);
		expect(res.body.id).toEqual(testDance.id);
		expect(res.body.regionId).toEqual(testDance.regionId);
		expect(res.body.stakeHost).toEqual(testDance.stakeHost);
		expect(res.body.location).toEqual(testDance.location);

		// delete dance
		res = await request(server)
			.delete(`/schedule/${danceId}`)

		//verify
		expect(res.statusCode).toEqual(200);

		// get dance
		res = await request(server)
		.get(`/schedule/${danceId}`);

		//verify
		expect(res.statusCode).toEqual(404)

	});
})

server.close();
