// set this so that tests can test.
process.env.ENV_DEV = true;

const regionExample = require("../models/region").regionExample;

const server = require("../server").server;

const request = require("supertest");
const exp = require("constants");

let testRegion = regionExample;

//////////////////////////////////////// ROUTE/CONTROLLER TESTS

///////////////// REGION ROUTE

describe("Region route test", function() {
    const regionId = 1;

    test("getRegion", async () => {
		let res = await request(server)
		.get(`/region/${regionId}`);
	
	// verify
	expect(res.statusCode).toEqual(200)
	})

    test("create/read/update/delete region", async () => {
        // change region name
        testRegion.name = "Test Idaho";
        testRegion.regionId = 1000;

        // create and save
        const resCorrect = await request(server)
            .post('/region')
            .send(testRegion);

        // verify creation
		expect(resCorrect.statusCode).toEqual(201);

        const regionId = resCorrect.body.regionId;
        testRegion.regionId = regionId;
        // get region
        let res = await request(server)
            .get(`/region/${regionId}`);

        // verify read
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(testRegion.name);
        expect(res.body.regionId).toEqual(testRegion.regionId);
        expect(res.body.standards).toEqual(testRegion.standards);
        expect(res.body.signingPassword).toEqual(testRegion.signingPassword);

        // make a change
        testRegion.name = "Update Test Idaho";
        const resPass = await request(server)
            .put(`/region/${regionId}`)
            .send(testRegion);

        // verify change
		expect(resPass.statusCode).toEqual(200);

        // get changes
        res = await request(server)
            .get(`/region/${regionId}`);

        // verify
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(testRegion.name);
        expect(res.body.regionId).toEqual(testRegion.regionId);
        expect(res.body.standards).toEqual(testRegion.standards);
        expect(res.body.signingPassword).toEqual(testRegion.signingPassword);

        // delete region
		res = await request(server)
        .delete(`/region/${regionId}`)

        //verify
        expect(res.statusCode).toEqual(200);

        // get region
        res = await request(server)
        .get(`/region/${regionId}`);

        //verify
        expect(res.statusCode).toEqual(404)

    });
})

server.close();
