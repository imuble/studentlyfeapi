import mongoose = require('mongoose');

export interface IActivityEffect extends mongoose.Document {
    condition: {
        type: String
        enum: ['SUCCESS', 'FAILURE', 'ALWAYS'],
    },
    attribute: mongoose.Schema.Types.ObjectId,
    change: Number,
};

export const ActivityEffectSchema = new mongoose.Schema({
    condition: {
        type: String,
        enum: ['SUCCESS', 'FAILURE', 'ALWAYS'],
        default: 'ALWAYS',
        required: true,
    },
    attribute: {type: mongoose.Schema.Types.ObjectId, ref: 'Attribute', required: true},
    change: {type: Number, required: true},
});

const ActivityEffect = mongoose.model<IActivityEffect>('ActivityEffect', ActivityEffectSchema)
export default ActivityEffect;