import express from 'express';
import User from '../models/register.mjs';
import bcrypt from 'bcrypt'
const router = express.Router();

// REGISITER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRegister = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newRegister.save();
    res.status(200).json({
      message: 'Registration Successful',
      user,
    });
  
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyValue && err.keyValue.email) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      console.log(err);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const login = await User.findOne({ email: req.body.email });
    if (!login) {
      return res.status(404).json('User Not Found');
    }

    const validPassword = await bcrypt.compare(req.body.password, login.password);
    if (!validPassword) {
      return res.status(400).json('Wrong Password');
    }

    // If correct password
    res.status(200).json({
      message: "Login Successful",
      user: login
    });
  } catch (err) {
    res.status(500).json('Cannot login');
  }
});

export default router;
