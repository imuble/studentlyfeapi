import mongoose = require('mongoose');

const activityEffect = {
    condition: {
        type: String,
        enum: ['SUCCESS', 'FAILURE', 'ALWAYS'],
        default: 'ALWAYS',
        required: true,
    },
    attribute: { type: mongoose.Schema.Types.ObjectId, ref: 'Attribute', required: true },
    change: { type: Number, required: true },
}

export interface IActivity extends mongoose.Document {
    name: string,
    selfEffects?: [Object],
    targetEffects?: [Object],
    successFactors?: [{ attribute: { type: string }, value: Number }],
    cooldown: Number,
    imageUrl?: string,
    description: string
};

export const ActivitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    selfEffects: [activityEffect],
    targetEffects: [activityEffect],
    successFactors: [{ attribute: { type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' }, value: Number }],
    cooldown: { type: Number, required: true },
    imageUrl: { type: String },
    description: { type: String, required: true}
});


const Activity = mongoose.model<IActivity>('Activity', ActivitySchema)
export default Activity;
