import express from 'express';
import User from '../models/register.mjs';
import bcrypt from 'bcrypt';

const router = express.Router();

// Update user details
router.put('/:id', async (req, res) => {
  if (req.body.userId == req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json({ message: "Account Updated", user:user });
    } catch (err) {
      return res.status(500).json("Failed to Update");
    }
  }
});


export default router;
 