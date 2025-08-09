import usersModel from "../model/user.js";
import auth from "../utils/auth.js";
//const url=process.env.DB_URL
//first we set the client

const getAllUsers = async (req, res) => {
  try {
    //to get the headers from the req where it also contain the authorization(bearer token option) in header

    //then we estatblish the connection
    //then choosing the specific database,what collection of database
    //then we finally right query
    //accessing the user collections document
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
    // here user recieve the booelan values whether the user exist or not
    let user = await usersModel.findOne({ email: req.body.email });
    req.body.status = true;
    if (!user) {
      //hash password
      req.body.password = await auth.hashData(req.body.password);
      await usersModel.create(req.body);
      res.status(201).send({ message: "User Created Sucessfully" });
    } else {
      res.status(201).send({ message: `User ${req.body.email}  AlreadyExist` });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const editUserById = async (req, res) => {
  try {
    //then we estatblish the connection
    //then choosing the specific database,what collection of database
    //then we finally right query
    // const usersModel = client.db(dbName).collection("users"); //accessing the user collections document
    let { id } = req.params;
    let user = await usersModel.findOne({ id: id }); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
    if (user) {
      // if i use update i wont validate the data
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

const changePassword = async (req, res) => {
  try {
    let { userId } = req.headers;
    let user = await usersModel.findOne({ id: userId }); // toarray is used to convert the data in array in form while recieving the data we will recieve in the json string format
    if (user) {
      let { newPassword, currentPassword } = req.body;
      if (auth.compareHash(user.password, currentPassword)) {
        user.password =await auth.hashData(newPassword)
        await user.save();
        res.status(200).send({
          message: "Password updated success",
        });
      }else{
        res.status(400).send({ message:"current password doesnto match" });
      }
    } else {
      res.status(400).send({
        message: `user does not exist`,
      });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

export default {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  editUserById,
  login,
  changePassword
};
