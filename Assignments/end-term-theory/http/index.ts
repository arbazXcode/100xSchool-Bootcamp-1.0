import express from "express";
import jwt from "jsonwebtoken";
import { userModel } from "./models";
import { signinSchema, signupSchema } from "./types";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/auth/signup", async (req, res) => {
  const { success, data } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid request schema",
    });
  }

  //if user already exists
  const user = await userModel.findOne({
    email: data.email,
  });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }
  // todo - hash the password

  const newUser = await userModel.create({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  res.status(201).json({
    success: true,
    name: newUser.name,
    email: newUser.email,
  });
});

app.post("/auth/signin", async (req, res) => {
  const { success, data } = signinSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid request schema",
    });
  }

  const user = await userModel.findOne({
    email: data.email,
  });

  if (!user || user.password != data.password) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const token = jwt.sign(
    {
      role: user.role,
      userId: user._id,
    },
    process.env.JWT_SECRET!
  );

  return res.status(200).json({
    success: true,
    token,
  });
});

app.get("/auth/me", async (req, res) => {
  const user = await userModel.findOne({ userId: req.userId });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Control shouldn't reach here.",
    });
  }

  res.json({
    success: true,
    error: "",
  });
});

app.listen(4000);
