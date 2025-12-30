import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Teacher"],
      default: "Student",
    },
  },
  { timestamps: true }
);

const classSchema = new mongoose.Schema({
  className: {
    type: String,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentIds: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  ],
});

const attendanceSchema = new mongoose.Schema({});

const userModel = mongoose.model("User", userSchema);
const classModel = mongoose.model("Class", classSchema);
export { userModel, classModel };
