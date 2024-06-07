const User = require("./model");
const hashData = require("../../utils/hashData");

const createNewUser = async (data) => {
  try {
    const { email, password, name } = data;
    const doesUserExist = await User.findOne({
      email,
    });

    if (doesUserExist) {
      return { success: false, messafge: "User already exists" };
    } else {
      const hashedPassword = await hashData(password);

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

module.exports = createNewUser;
