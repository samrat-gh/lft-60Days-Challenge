const User = require("model");

const createNewUser = async (data) => {
  try {
    const { email, password, name } = data;

    const doesUserExist = await User.findOne({
      email,
    });

    if (doesUserExist) {
      throw new Error("User with this email already exist");
    } else {
      const hashedPassword = await hasData(password);

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      const createdUser = await user.save();
      return createdUser;
    }

    // hash password
  } catch (error) {
    throw error;
  }
};

module.export = { createNewUser };
