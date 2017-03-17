import mongoose = require('mongoose');
import AttributeSchema from "../attribute/model";

export interface IUser extends mongoose.Document {
	name: string,
	fbId: string,
	attributes?: [{key: mongoose.Schema.Types.ObjectId, value: number}],
};

export const UserSchema = new mongoose.Schema({
	name: {type:String, required: true},
	fbId: {type:String, required: true},
	attributes: [{key: mongoose.Schema.Types.ObjectId, value: Number}]
});

const User = mongoose.model<IUser>('User', UserSchema)
export default User;
