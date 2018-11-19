module.exports = dbPool => {
  const checkLogin = (input, callback) => {
    const text = `SELECT * FROM users WHERE username = '${
      input.username
    }' AND password = '${input.password}';`;

    dbPool.query(text, (error, result) => {
      if (result.rows.length > 0) {
        callback(error, result.rows[0]);
      } else {
        callback(error, { wrong: "wrongInput" });
      }
    });
  };

  const checkRegister = (input, callback) => {
    const text = `SELECT * FROM users WHERE username = '${
      input.username
    }' OR email = '${input.email}';`;

    dbPool.query(text, (error, result) => {
      if (error) {
        console.log("error in checking users: ", error.message);
        callback(error);
      } else {
        check = result.rows;
        if (check.length > 0) {
          if (check[0].email === input.email) {
            callback(error, { eExist: "emailExist" });
          } else if (check[0].username === input.username) {
            callback(error, { uExist: "usernameExist" });
          }
        } else {
          const text = `INSERT INTO users (username, name, password, email) VALUES ($1, $2, $3, $4) RETURNING id, username, email;`;
          const values = [
            input.username,
            input.fullName,
            input.password,
            input.email
          ];

          dbPool.query(text, values, (error, result) => {
            callback(error, result.rows[0]);
          });
        }
      }
    });
  };
  return {
    checkRegister,
    checkLogin
  };
};
