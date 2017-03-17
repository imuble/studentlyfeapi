var mongoose = require('mongoose');

export interface IUser extends mongoose.Document {
	name: string,
	fbId: string
};

export const UserSchema = new mongoose.Schema({
	name: {type:String, required: true},
	fbId: {type:String, required: true},
});

const User = mongoose.model<IUser>('User', UserSchema);