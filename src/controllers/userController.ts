import User from "../models/User";
import { Request, Response } from "express";

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }