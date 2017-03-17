import mongoose = require('mongoose');
import AttributeSchema from "../attribute/model";

export interface IUser extends mongoose.Document {
	name?: string,
	fbId: string,
	attributes?: [{key: {type: mongoose.Schema.Types.ObjectId}, value: number}],
};

export const UserSchema = new mongoose.Schema({
	name: {type:String},
	fbId: {type:String, required: true},
	attributes: [{key: {type: mongoose.Schema.Types.ObjectId, ref: 'Attribute'}, value: Number}]
});

const User = mongoose.model<IUser>('User', UserSchema)
export default User;
