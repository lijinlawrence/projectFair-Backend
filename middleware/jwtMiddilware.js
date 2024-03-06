const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("inside jwtMiddleware");
  const token = req.headers["authorization"].split(" ")[1]; //index position

  try {
    // console.log(token);
    const jwtResponse = jwt.verify(token,"secretkey123");
    console.log(jwtResponse);
    req.payload = jwtResponse.userId
    next()
  } catch (err) {
    res.status(401).json("authorization faild!! please login");
    console.log(err);
  }
};

module.exports = jwtMiddleware;
