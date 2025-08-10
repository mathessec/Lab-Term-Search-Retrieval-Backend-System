import usersModel from "../model/user.js";
import auth from "../utils/auth.js";
//const url=process.env.DB_URL
//first we set the client

const getAllUsers = async (req, res) => {
  try {
    let users = await usersModel.find({}, { _id: 0 }); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
    res.status(200).send({
      message: "Data fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    //then we estatblish the connection
    //then choosing the specific database,what collection of database
    //then we finally right query
    let { id } = req.params;
    let user = await usersModel.findOne({ id: id }, { _id: 0 }); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
    res.status(200).send({
      message: "Data fetched Successfully",
      data: user,
    });
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    
    // Simple validation
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    
    // Check if user exists
    let user = await usersModel.findOne({ email: req.body.email });
    
    if (!user) {
      // Hash password
      req.body.password = await auth.hashData(req.body.password);
      
      // Create user
      await usersModel.create(req.body);
      res.status(201).send({ message: "User Created Successfully" });
    } else {
      res.status(200).send({ message: `User ${req.body.email} Already Exists` });
    }
  } catch (error) {
    console.log('Full error:', error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const editUserById = async (req, res) => {
  try {
    let { id } = req.params;
    
    // Use MongoDB's _id field
    let user = await usersModel.findById(id);
    
    if (user) {
      const { name, email, mobile, status, role } = req.body;
      user.name = name ? name : user.name;
      user.email = email ? email : user.email;
      user.mobile = mobile ? mobile : user.mobile;
      user.status = status ? status : user.status;
      user.role = role ? role : user.role;
      
      await user.save();
      res.status(200).send({ message: "User Edited Successfully" });
    } else {
      res.status(400).send({ message: "Invalid Id" });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    //then we estatblish the connection
    //then choosing the specific database,what collection of database
    //then we finally right query//accessing the user collections document
    let { id } = req.params;
    let data = await usersModel.deleteOne({ id: id }); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
    if (data.deletedCount) {
      res.status(200).send({ message: "User Deleted Successfully" });
    } else {
      res.status(400).send({ message: "Invalid Id" });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await usersModel.findOne({ email: email }); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
    if (user) {
      if (await auth.compareHash(user.password, password)) {
        /// when login is successfull then we have to create token
        const token = auth.createToken({
          email: user.email,
          name: user.name,
          role: user.role,
          id: user.id,
        });
        res.status(200).send({
          message: "Login Successfull",
          role:user.role,
          token,
        });
      } else {
        res.status(400).send({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).send({
        message: `user with emai ${req.body.email} does not exist`,
      });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

// change password

// Add this after your other functions in controller.js
const testUser = async (req, res) => {
  try {
    let { userId } = req.headers;
    let user = await usersModel.findOne({ id: userId });
    if (user) {
      res.status(200).send({
        message: "User found",
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          // Don't send the actual password, just confirm it exists
          hasPassword: !!user.password
        }
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  editUserById,
  login,
  changePassword,
  testUser
};
