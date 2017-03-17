import mongoose = require('mongoose');

export interface IPerformedActivity extends mongoose.Document {
    activity: string,
    readyAt: Date,
};

export const PerformedActivitySchema = new mongoose.Schema({
    activity: {type:mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true},
    readyAt: {type:Date, required: true},
});

const PerformedActivity = mongoose.model<IPerformedActivity>('PerformedActivity', PerformedActivitySchema)
export default PerformedActivity;
