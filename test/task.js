let server = require("../index.js");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion 
chai.should();
chai.use(chaiHttp); 

describe("Test GET route /", () => {
	
	it("It should return 200.", (done) => {
		chai.request(server)
			.get("/")
			.end((err, response) => {
				response.should.have.status(200);
				done();
			});
	});
});
