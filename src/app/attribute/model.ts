import mongoose = require('mongoose');

export interface IAttribute extends mongoose.Document {
    key: string,
    suffix?: string,
    description: string
};

export const AttributeSchema = new mongoose.Schema({
    key: {type:String, required: true},
    description: {type: String, required: true},
    suffix: {type:String}
});

const Attribute = mongoose.model<IAttribute>('Attribute', AttributeSchema);
export default Attribute;
