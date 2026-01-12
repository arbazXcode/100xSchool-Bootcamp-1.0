import mongoose from "mongoose";
await mongoose.connect(process.env.MONGO_URI!);
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

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const attendanceSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
const classModel = mongoose.model("Class", classSchema);
const attendanceModel = mongoose.model("Attendance", attendanceSchema);
export { userModel, classModel, attendanceModel };
