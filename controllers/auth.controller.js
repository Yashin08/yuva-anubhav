const { User, Helper } = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt=require("bcrypt");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


module.exports.signup_get=(req,res)=>{
    res.render('signup_user');
    
}
module.exports.signup_get_vl=(req,res)=>{
    res.render('signup_vl');
    
}

module.exports.login_get=(req,res)=>{
    res.render('login');
    // res.send("signup_get");
    
}
module.exports.signup_post = async (req, res) => {
    try {
        const { username, firstname, lastname, aadharcard, dob, address, email, password } = req.body;
        
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        // Create a new user instance
        const newUser = new User({ username, firstname, lastname, aadharcard, dob, address, email, password });

        // Save the user to the database
        await newUser.save();

        res.render('home');
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

module.exports.signup_post_vl = async (req, res) => {
    try {
        const { username, firstname, lastname, aadharcard, dob, address, email, password } = req.body;
        
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        // Create a new user instance
        const newUser = new Helper({ username, firstname, lastname, aadharcard, dob, address, email, password });

        // Save the user to the database
        await newUser.save();

        res.render('/');
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};



module.exports.login_post = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username exists in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Compare the password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // If the username and password are correct, you can create a session
        // req.session.user = user;

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ error: "Server error" });
    }
};
    
