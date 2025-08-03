const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) {
		next();
	}
	try {
		const saltRound = await bcrypt.genSalt(10);
		const hash_password = await bcrypt.hash(user.password, saltRound);
		user.password = hash_password;
	} catch (error) {
		next(error);
	}
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
	try {
    return jwt.sign({
      userId:this._id.toString(),
      email:this.email,
    },
    process.env.JWT_SECRET,{
      expiresIn:"7d",
    }
  );
	} catch (error) {
		console.error(error);
	}
};

module.exports = mongoose.model("User", userSchema);
