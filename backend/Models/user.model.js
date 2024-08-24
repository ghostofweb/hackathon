import mongoose,{Schema,model} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { hash, compare } = bcrypt;

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
    type: String,
    default: 'https://www.nationalgeographic.com/animals/mammals/facts/domestic-dog',
  },
  role: {
    type: String,
    enum: ['Leader', 'teamMember'],
    required: true,
    default: 'teamMember',
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
    default: [],
  }],
}, {
  timestamps: true,
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
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
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
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export { User };
