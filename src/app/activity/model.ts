import mongoose = require('mongoose');

export interface IActivity extends mongoose.Document {
    name: string,
    selfEffects?: [{key: mongoose.Schema.Types.ObjectId}],
    targetEffects?: [{key: mongoose.Schema.Types.ObjectId}],
    successFactors?: [{key: mongoose.Schema.Types.ObjectId, value: Number}]
};

export const ActivitySchema = new mongoose.Schema({
    name: {type:String, required: true},
    selfEffects: [{key: {type: mongoose.schema.Types.ObjectId, ref: 'ActivityEffect'}}],
    targetEffects: [{key: {type: mongoose.schema.Types.ObjectId, ref: 'ActivityEffect'}}],
    successFactors: [{key: {type: mongoose.Schema.Types.ObjectId, ref: 'Attribute'}, value: Number}]
});


const Activity = mongoose.model<IActivity>('Activity', ActivitySchema)
export default Activity;
