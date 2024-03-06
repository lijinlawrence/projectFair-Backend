const users = require("../Model/userSchema");
const jwt = require("jsonwebtoken")

// register

exports.register = async (req, res) => {
  console.log("inside register controller function");
  const { username, email, password } = req.body;
  // console.log(`${username},${email},${password}`);
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("already exists!!please login");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkedin: "",
        profile: "",
      });
      await newUser.save(); // save() is a mongodb function mongo db li save apnnana vendi
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`registration api failed,error:${err}`);
  }
};

// login
exports.login= async(req,res)=>{
  console.log("inside login function");
  const {email,password}= req.body
  try{
    const existingUser = await users.findOne({email,password})
    if(existingUser){
      const token = jwt.sign({userId:existingUser._id},"secretkey123")
      res.status(200).json({
        existingUser,token
      })
    }else{
      res.status(404).json( "incorrect email/password")
    }
  }catch(err){
       res.status(401).json(`login API failed , Error"${err}`)
  }
}
