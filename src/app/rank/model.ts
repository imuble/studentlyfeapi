import mongoose = require('mongoose');

export interface IRank extends mongoose.Document {
    name: string,
    requiredExperience: Number
    imageUrl?: string
};

export const RankSchema = new mongoose.Schema({
    name: {type:String, required: true},
    requiredExperience: {type: Number, required: true},
    imageUrl: {type: String}
});

const Rank = mongoose.model<IRank>('Rank', RankSchema);
export default Rank;
