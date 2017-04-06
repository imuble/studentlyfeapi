import mongoose = require('mongoose');

export interface IGroup extends mongoose.Document {
    name: string,
    imageUrl?: string,
    description: string,
    members?: [string]
};

export const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    admins: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    leader: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});


const Group = mongoose.model<IGroup>('Group', GroupSchema)
export default Group;
