module.exports = db => {
  const checkLogin = (req, res) => {
    db.patient.checkLogin(req.body, (error, result) => {
      if (error) {
        console.log("error", error.message);
        res.send({ error: "error500" });
      } else {
        res.send(result);
      }
    });
  };

  const checkRegister = (req, res) => {
    db.patient.checkRegister(req.body, (error, result) => {
      if (error) {
        console.log("error", error.message);
        res.send({ error: "error500" });
      } else {
        res.send(result);
      }
    });
  };
  return {
    checkLogin,
    checkRegister
  };
};
