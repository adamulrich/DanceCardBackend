
const server = require("../server").server;
// const addHeroExample = require('../models/heroes').addHeroExample;

const request = require("supertest");
const exp = require("constants");

describe("Sanity test", () => {
	test("1 should equal 1", () => {
		expect(1).toBe(1);
	});
});

describe("login page test", function () {
	test("200 code & html", async () => {
		const res = await request(server).get("/");
		expect(res.text.substring(0,15)).toEqual('<!DOCTYPE html>');
		expect(res.statusCode).toEqual(200);
	});
});


server.close();
