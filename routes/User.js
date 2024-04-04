const User =  require("../models/User"); 
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const string = require("../models/String");
const { appendFile } = require("fs");
const router = require("express").Router();


// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// REGISTER

router.post("/register", async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Create new user

    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
    });

    // Save user and respond
    const user = await newUser.save();
    res.status(201).json({
      data: user,
    });

    // Handle response here
  } catch (error) {
    if (error.keyValue?.email != null && error.code === 11000) {
      res.status(500).send({ message: "user with this email already exist" });
    } else if (error.keyValue?.username != null && error.code === 11000) {
      res.status(500).send({ message: "user with the username already exist" });
    } else {
      res.status(500).send({ message: error });

    }
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      // $or: [{ email: req.body.email }, { username: req.body.username }],
      phone: req.body.phone,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    res.status(200).json({ data:user, status:200 });
    // const token = createToken(user.id);
    // console.log(token);
    // res.cookie("access_token", token);
  } catch (err) {
    res.status(500).json({ message:err });
  }
});

// LOGOUT
router.get("/logout", (req,res) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.status(202).json({ message: "User logged out" });
  } catch (error) {
    res.status(401).json({ message: "Authorization failed" });
  }
});

// Get a user
router.get("/account/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// app.post("/scan", (req, res) => {
//   console.log(req.body)
//   res.send(req.body)
// })
  

// router.post("/sca/",async (req, res) => {
//   const { some } = req.body
//   const data = {
//     button2: some
//   } 
// console.log(req.body);
// console.log(data)
// const new_String=new String({content:some,createdAt:Date.now()});
// new_String.save().then((data)=>{
//   console.log(data);
//   res.send(data);
// });
// // collection.insertone([data])
// res.send(data)
// })

/*main code start for sca*/

// router.post("/sca/", async (req, res) => {
//   const { some } = req.body;
//   const data = { button2: some, createdAt: Date.now() };

//   try {
//     const new_String = new String(data);
//     const saved_String = await new_String.save();
//     console.log(saved_String);
//     res.send(saved_String);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error saving string to database" });
//   }
// });

/*main code for sca ending*/

// const String = require('../routes/string');

// router.post('/sca', async (req, res) => {
//   const { content } = req.body;

//   try {
//     const newString = new String({ content });
//     const savedString = await newString.save();
//     res.status(201).json({ message: 'String uploaded to database successfully' });

//     // res.status(201).json(savedString);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving string to database' });
//   }
// });



module.exports = router;


