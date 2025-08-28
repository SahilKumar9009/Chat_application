import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    socketId: {
      type: String,
      default: null,
    },
    deviceTokens: [
      {
        token: String,
        platform: { type: String, enum: ["ios", "android", "web"] },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    settings: {
      notifications: {
        messages: { type: Boolean, default: true },
        mentions: { type: Boolean, default: true },
        sounds: { type: Boolean, default: true },
      },
      privacy: {
        lastSeen: { type: Boolean, default: true },
        profilePhoto: { type: Boolean, default: true },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Hide sensitive data when converting to JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.passwordHash;
  delete userObject.deviceTokens;
  return userObject;
};

// Create indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ isOnline: 1 });

const User = mongoose.model("User", userSchema);

export default User;
