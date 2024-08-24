import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'; // Import bcryptjs as default
import jwt from 'jsonwebtoken'; // Import jwt for token handling

const { hash, compare } = bcrypt; // Destructure hash and compare from bcrypt

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String, // URL or path
    default: 'https://www.nationalgeographic.com/animals/mammals/facts/domestic-dog', // Default blank
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
    default: [], // Default empty array
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});

// Compare provided password with hashed password
UserSchema.methods.isPasswordCorrect = async function(candidatePassword) {
  return await compare(candidatePassword, this.password);
};

// Generate Access Token
UserSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            // fullName: this.fullName // Ensure fullName is defined or remove if not used
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Accessed through process.env
        }
    );
};

// Generate Refresh Token
UserSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Accessed through process.env
        }
    );
};

export const User = model('User', UserSchema);
