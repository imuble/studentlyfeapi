import mongoose = require('mongoose');

export interface IActivity extends mongoose.Document {
    name: string,
    selfEffects?: [{activityEffect: {type:  string}}],
    targetEffects?: [{activityEffect: {type: string}}],
    successFactors?: [{attribute: {type: string}, value: Number}],
    cooldown: Number,
    imageUrl?: string,
};

export const ActivitySchema = new mongoose.Schema({
    name: {type:String, required: true},
    selfEffects: [{activityEffect: {type: mongoose.Schema.Types.ObjectId, ref: 'ActivityEffect'}}],
    targetEffects: [{activityEffect: {type: mongoose.Schema.Types.ObjectId, ref: 'ActivityEffect'}}],
    successFactors: [{attribute: {type: mongoose.Schema.Types.ObjectId, ref: 'Attribute'}, value: Number}],
    cooldown: {type: Number, required: true},
    imageUrl: {type:String}
});


const Activity = mongoose.model<IActivity>('Activity', ActivitySchema)
export default Activity;
