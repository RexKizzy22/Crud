"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
;
const data = {
    organization: "node ninja",
    products: ["developers", "pizza"],
    marketValue: "90%",
    address: "sangotedo",
    ceo: "cn",
    country: "Taiwan",
    noOfEmployees: 2,
    employees: ["james bond", "jackie chan"]
};
let id = "";
let length = 0;
describe("POST /", () => {
    it("should add the posted data to the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).post("/").send(data);
        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("createdAt");
        id = res.body.data.id;
    }));
    it("should return an 400 status for invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).post("/").send({});
        expect(res.status).toBe(400);
    }));
});
describe("GET /", () => {
    it("should return an array of data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).get("/");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        length = res.body.data.length;
    }));
});
describe("GET /:id", () => {
    it("should fetch a resource by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).get(`/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.data.id).toBe(parseInt(id));
    }));
    it("should return an 400 status for invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 0;
        const res = yield supertest_1.default(app_1.default).get(`/${id}`);
        expect(res.status).toBe(400);
    }));
    it("should return an 404 status for item not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 500;
        const res = yield supertest_1.default(app_1.default).get(`/${id}`);
        expect(res.status).toBe(404);
    }));
});
describe("PUT /", () => {
    data.country = "Canada";
    it("should update the data with the specified id with the new info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).put(`/${id}`).send(data);
        expect(res.status).toBe(200);
        expect(res.body.data.country).toBe("Canada");
    }));
    it("should return an 404 status for item not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 500;
        const res = yield supertest_1.default(app_1.default).put(`/${id}`);
        expect(res.status).toBe(404);
    }));
    it("should return an 400 status for invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 0;
        const res = yield supertest_1.default(app_1.default).put(`/${id}`);
        expect(res.status).toBe(400);
    }));
});
describe("DELETE /", () => {
    it("should decrease the amount of resources in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).delete(`/${id}`);
        const resAll = yield supertest_1.default(app_1.default).get("/");
        expect(res.status).toBe(200);
        expect(resAll.body.data.length).toBe(length - 1);
    }));
    it("should return an 400 status for invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 0;
        const res = yield supertest_1.default(app_1.default).delete(`/${id}`);
        expect(res.status).toBe(400);
    }));
    it("should return an 404 status for item not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 500;
        const res = yield supertest_1.default(app_1.default).delete(`/${id}`);
        expect(res.status).toBe(404);
    }));
});
//# sourceMappingURL=app.test.js.map