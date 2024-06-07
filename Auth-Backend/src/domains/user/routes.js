const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!name && !email && !password) {
      throw new Error("Empty Error Fields");
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      throw new Error("Invalid name entered");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw new Error("Invalid Email");
    } else if (password.length < 8) {
      throw new Error("Password must be at 8 characters long");
    } else {
      const newUser = createNewUser({
        name,
        email,
        password,
      });

      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
