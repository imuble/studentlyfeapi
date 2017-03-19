import mongoose = require('mongoose');
import AttributeSchema from "../attribute/model";

export interface IUser extends mongoose.Document {
	name?: string,
	fbId: string,
	isAdmin?: Boolean,
	attributes?: [{name: String, value: number}],
	performedActivities?: [{type: mongoose.Schema.Types.ObjectId}],
	imageUrl?: string
};

export const UserSchema = new mongoose.Schema({
	name: {type:String},
	fbId: {type:String, required: true},
	isAdmin: {type:Boolean, default:false},
	attributes: [{attribute: {type: mongoose.Schema.Types.ObjectId, ref: 'Attribute'}, value: {type: Number}}],
	performedActivities: [{type: mongoose.Schema.Types.ObjectId, ref: "PerformedActivity"}],
	imageUrl: {type: String}
});

const User = mongoose.model<IUser>('User', UserSchema)
export default User;
