const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();

router.post("/", async (request, response) => {
  let userRegistrationData = request.body;
  // userRegistrationData.userType = "Customer";
  try {
    await usersLogic.addUser(userRegistrationData);
    response.json();
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

router.post("/login", async (request, response) => {
  let userLoginData = request.body;
  try {
    let successfulLoginResponse = await usersLogic.login(userLoginData);
    console.log(successfulLoginResponse);
    response.json(successfulLoginResponse);
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

module.exports = router;
