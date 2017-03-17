import mongoose = require('mongoose');

export interface IActivity extends mongoose.Document {
    name: string,
    selfEffects?: [{key: mongoose.Schema.Types.ObjectId}],
    targetEffects?: [{key: mongoose.Schema.Types.ObjectId}],
};

export const ActivitySchema = new mongoose.Schema({
    name: {type:String, required: true},
    selfEffects: [{key: mongoose.schema.Types.ObjectId, ref: 'ActivityEffect'}],
    targetEffects: [{key: mongoose.schema.Types.ObjectId, ref: 'ActivityEffect'}]
});


const Activity = mongoose.model<IActivity>('Activity', ActivitySchema)
export default Activity;
