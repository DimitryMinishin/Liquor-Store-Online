const connection = require("./connection-wrapper");

async function addUser(userRegistrationData) {
  let sql =
      `insert into customers(first_name, last_name, email, password, city, street, house_number, phone, customer_type) ` +
    `values(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let parameters = [
    userRegistrationData.firstName,
    userRegistrationData.lastName,
    userRegistrationData.email,
    userRegistrationData.password,
    userRegistrationData.city,
    userRegistrationData.street,
    userRegistrationData.houseNumber,
    userRegistrationData.phone,
    userRegistrationData.userType
];
  await connection.executeWithParameters(sql, parameters);
}

async function isUserNameExist(email) {
  let sql = "select customer_id from customers where email = ?";
  let parameters = [email];
  let users = await connection.executeWithParameters(sql, parameters);
  if (users && users.length > 0) {
    return true;
  }
  return false;
}

async function login(user) {
  let sql = `SELECT customer_id, customer_type as userType, first_name as firstName, last_name as lastName from customers where email = ? and password = ?`;
  let parameters = [user.email, user.password];
  let [userData] = await connection.executeWithParameters(sql, parameters);

  if (!userData) {
    return null;
  }
  return userData;
}

module.exports = {
  addUser,
  isUserNameExist,
  login,
};
