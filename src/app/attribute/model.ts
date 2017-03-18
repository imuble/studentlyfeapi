import mongoose = require('mongoose');

export interface IAttribute extends mongoose.Document {
    name: string,
    suffix?: string,
    description: string,
    defaultValue?: Number
};

export const AttributeSchema = new mongoose.Schema({
    name: {type:String, required: true, index: true},
    description: {type: String, required: true},
    suffix: {type:String},
    defaultValue: {type: Number, default: 0}
});

const Attribute = mongoose.model<IAttribute>('Attribute', AttributeSchema);
export default Attribute;
