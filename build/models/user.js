const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	password: String,
	pass_salt: String,
	reg_date: Date
});

module.exports = User = mongoose.model('User', UserSchema);