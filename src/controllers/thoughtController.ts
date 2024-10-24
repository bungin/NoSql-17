import { Request, Response } from "express";
import Thought from "../models/Thought.js";
import User from "../models/User.js";

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: newThought._id } }, // Ensure the field name is 'thoughts'
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "No user found with this id!" });
        }

        return res.status(201).json(newThought);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: "No thought found with this id!" });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({
            _id: req.params.thoughtId,
        });

        if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "No user found with this thought id!" });
        }

        await User.updateMany(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } }
        );

        return res.status(200).json({ message: "Thought successfully deleted!" });
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const addReaction = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }

        return res.json(updatedThought);
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }

        return res.json(updatedThought);
    } catch (err) {
        return res.status(500).json(err);
    }
};