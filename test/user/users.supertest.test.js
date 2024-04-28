import mongoose from "mongoose";
import config from "../../src/config/config.js";
import supertest from "supertest";
import { expect } from "chai";

const requester = supertest(config.rootUrl);

describe("Testing session usando cookies", () => {
  before(function () {
    this.cookie;

    this.testUser = {
      first_name: "testUser",
      last_name: "testUser",
      email: "testUser@gmail.com",
      age: 30,
      password: "123",
    };
    this.userID;
  });
  it("Registrar correctamente al usuario", async function () {
    //given
    //then
    const { statusCode } = await requester
      .post("/api/jwt/register")
      .send(this.testUser);

    //assert
    expect(statusCode).is.eql(201);
  });

  it("No registrar al usuario si el email ya existe", async function () {
    //given
    //then
    const { statusCode, _body } = await requester
      .post("/api/jwt/register")
      .send(this.testUser);
    //assert
    expect(statusCode).is.eql(302);
  });

  it("Loguear correctamente al usuario", async function () {
    //given
    const loginTest = {
      email: this.testUser.email,
      password: this.testUser.password,
    };

    //then
    const result = await requester.post("/api/jwt/login").send(loginTest);

    const cookieResult = result.headers["set-cookie"][0];

    this.userID = result._body._id;

    //assert
    expect(result.statusCode).is.eql(200);

    //extraemos la cookie para guardarla en la variable global this.cookie
    const cookieData = cookieResult.split("=");
    this.cookie = {
      name: cookieData[0],
      value: cookieData[1],
    };

    expect(this.cookie.name).to.be.ok.and.eql("jwtCookieToken");
    expect(this.cookie.value).to.be.ok;
  });


  it("Traer al usuario buscado por ID", async function () {
    //given
    //test
    const result = await requester
      .get(`/api/users/${this.userID}`)
      .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);

    //assert
    expect(result.statusCode).is.eqls(200);
    // expect(result._body).to.be.ok.and.eql(this.userID);
  });

  // after(function () {
  //   mongoose.connection.collections.users.drop();
  // })
});

// npx mocha test/user/users.supertest.test.js
