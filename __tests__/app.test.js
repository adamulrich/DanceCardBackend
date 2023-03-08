const stake = require('../models/stake');
const ward = require('../models/ward');

const server = require("../server").server;
// const addHeroExample = require('../models/heroes').addHeroExample;

const request = require("supertest");
const exp = require("constants");
const { getNewStakeId } = require("../models/stake");

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


// model tests
const stakeModel = require('../models/stake').stakeModel;
const stakeExample = require('../models/stake').stakeExample;

describe("test stake model and example", function () {
	test("create, read, update, delete stake", async () => {

		// get new ID
		const newStakeId = await stake.getNewStakeId();
		expect(newStakeId).toBeGreaterThanOrEqual(1);

		// create new Stake object
		const newStake = new stakeModel(stakeExample);
		newStake.stakeId = newStakeId;

		//save and validate
		await newStake.save();

		let mongoStake = await stakeModel.findOne({ 'stakeId': newStakeId });

		expect(mongoStake.name).toEqual(newStake.name);
		expect(mongoStake.stakeId).toEqual(newStake.stakeId);
		expect(mongoStake.regionId).toEqual(newStake.regionId);

		// update name and validate
		newStake.name = "Kent, WA";

		let result = await stakeModel.updateOne({ stakeId: newStakeId }, newStake, { runValidators: true});
		expect(result.modifiedCount).toEqual(1);

		mongoStake = await stakeModel.findOne({ 'stakeId': newStakeId });
		expect(mongoStake.name).toEqual(newStake.name);
		expect(mongoStake.stakeId).toEqual(newStake.stakeId);
		expect(mongoStake.regionId).toEqual(newStake.regionId);

		// delete it and validate
		result = await stakeModel.deleteOne({ stakeId: newStakeId });
		expect(result.deletedCount).toEqual(1);

		mongoStake = await stakeModel.findOne({ 'stakeId': newStakeId });
		expect(mongoStake).toEqual(null);
	})
});


const wardModel = require('../models/ward').wardModel;
const wardExample = require('../models/ward').wardExample;

describe("test ward model and example", function () {
	test("create, read, update, delete ward", async () => {

		// get new ID
		const newWardId = await ward.getNewWardId();
		expect(newWardId).toBeGreaterThanOrEqual(1);

		// create new ward object
		const newWard = new wardModel(wardExample);
		newWard.wardId = newWardId;

		//save and validate
		await newWard.save();

		let mongoward = await wardModel.findOne({ 'wardId': newWardId });

		expect(mongoward.name).toEqual(newWard.name);
		expect(mongoward.wardId).toEqual(newWard.wardId);
		expect(mongoward.regionId).toEqual(newWard.regionId);

		// update name and validate
		newWard.name = "Scenic Hill Ward";

		let result = await wardModel.updateOne({ wardId: newWardId }, newWard, { runValidators: true });
		expect(result.modifiedCount).toEqual(1);

		mongoward = await wardModel.findOne({ 'wardId': newWardId });
		expect(mongoward.name).toEqual(newWard.name);
		expect(mongoward.wardId).toEqual(newWard.wardId);
		expect(mongoward.regionId).toEqual(newWard.regionId);

		// delete it and validate
		result = await wardModel.deleteOne({ wardId: newWardId });
		expect(result.deletedCount).toEqual(1);

		mongoward = await wardModel.findOne({ 'wardId': newWardId });
		expect(mongoward).toEqual(null);
	})
})

const userModel = require('../models/user').userModel;
const userExample = require('../models/user').userExample;

describe("test user model and example", function () {
	test("read user", async () => {

		const newUser = userExample;
		
		// create new ward object
		let mongoUser = await userModel.findOne({ 'email': newUser.email });
		console.log(newUser);
		console.log(mongoUser);

		expect(mongoUser.name).toEqual(newUser.name);
		expect(mongoUser.parentEmail).toEqual(newUser.parentEmail);
		expect(mongoUser.stakeId).toEqual(newUser.stakeId);
		expect(mongoUser.stakeName).not.toBe('');

	})

})
