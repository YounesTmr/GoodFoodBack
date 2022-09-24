const dish = require('./controller/test');
require("dotenv").config();
const mongoose = require("mongoose");
const assert = require('assert');
const id = "rr"
describe('DISH', function () {
    try {

        before(async function () {
            await mongoose.connect(process.env.DB, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
        });
        describe("getAllDishes", function () {
            it('will get all dishes', async () => {
                let dishes = await dish.getAllDishes();
                assert.strictEqual(dishes.status, "success");
            });
        });
        describe("getDish", function () {
            it('will get dish', async () => {
                let dishes = await dish.getDish();
                assert.strictEqual(dishes.status, "success");
            });
        });
        describe("deleteDish", function () {
            it('will delete dish', async () => {
                let dishes = await dish.deleteDish(id);
                assert.strictEqual(dishes.status, "success");
            });
        });

    } catch (error) {
        console.log("error: ", error);
        return;
    }
})