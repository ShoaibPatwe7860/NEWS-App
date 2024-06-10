// const express = require("express");
// const UserModel = require("../models/UserModel");
// const router = express.Router();

// router.post("/register", async function (req, res) {
//   try {
//     const newitem = new UserModel(req.body);
//     await newitem.save();
//     res.send("User added successfully");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const result = await UserModel.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     // delete result.password
//     // res.send(result)
//     if (result) {
//       const userobj = result.toObject();
//       delete userobj.password;
//       res.send(userobj);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("error");
//   }
// });

// module.exports = router;

const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();

//ragister
router.post("/register", async function (req, res) {
  try {
    const newitem = new UserModel(req.body);
    await newitem.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const result = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    // delete result.password
    // res.send(result)
    // res.send("User login successfully");
    if (result) {
      const userobj = result.toObject();
      delete userobj.password;
      res.send(userobj);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});

module.exports = router;
