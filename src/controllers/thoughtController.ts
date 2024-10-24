import { ObjectId } from "mongodb";
import { Request, response, Response } from "express";
import { Thought, User } from "../models";

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
    const thoughtId = newThought._id;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughtText: newThought } },
      { new: true }
    );
    res.status(201).json(updatedUser); //needed?
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(200).json({ message: "Thought successfully deleted!" });

    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" });
    }
  } catch (err) {
    res.status(500).json(err);
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

        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
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

        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
};