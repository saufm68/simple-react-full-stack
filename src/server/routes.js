module.exports = (app, db) => {
  const patient = require("./controllers/patient")(db);

  app.post("/api/checkLogin", patient.checkLogin);
  app.post("/api/checkRegister", patient.checkRegister);
};
