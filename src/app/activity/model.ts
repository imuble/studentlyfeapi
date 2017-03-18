import mongoose = require('mongoose');

export interface IActivity extends mongoose.Document {
    name: string,
    selfEffects?: [{key: {type:  string}}],
    targetEffects?: [{key: {type: string}}],
    successFactors?: [{key: {type: string}, value: Number}]
};

export const ActivitySchema = new mongoose.Schema({
    name: {type:String, required: true},
    selfEffects: [{key: {type: mongoose.Schema.Types.ObjectId, ref: 'ActivityEffect'}}],
    targetEffects: [{key: {type: mongoose.Schema.Types.ObjectId, ref: 'ActivityEffect'}}],
    successFactors: [{key: {type: mongoose.Schema.Types.ObjectId, ref: 'Attribute'}, value: Number}]
});


const Activity = mongoose.model<IActivity>('Activity', ActivitySchema)
export default Activity;
