import mongoose = require('mongoose');
import AttributeSchema from "../attribute/model";

export interface IUser extends mongoose.Document {
	name: string,
	fbId: string,
	isAdmin?: Boolean,
	attributes?: [{attribute: String, value: number}],
	performedActivities?: [{type: mongoose.Schema.Types.ObjectId}],
	groups?: [{type: mongoose.Schema.Types.ObjectId}],
	imageUrl?: string
};

export const UserSchema = new mongoose.Schema({
	name: {type:String,required: true},
	fbId: {type:String, required: true},
	pushToken: {type: String},
	isAdmin: {type:Boolean, default:false},
	attributes: [{attribute: {type: mongoose.Schema.Types.ObjectId, ref: 'Attribute'}, value: {type: Number}}],
	performedActivities: [{type: mongoose.Schema.Types.ObjectId, ref: "PerformedActivity"}],
	imageUrl: {type: String},
	groups: [{type: mongoose.Schema.Types.ObjectId, ref: "Group"}],
});

const User = mongoose.model<IUser>('User', UserSchema)
export default User;
