import mongoose = require('mongoose');

export interface IAttribute extends mongoose.Document {
    key: string,
    suffix?: string
};

export const AttributeSchema = new mongoose.Schema({
    name: {type:String, required: true},
    suffix: {type:String},
});

const Attribute = mongoose.model<IAttribute>('IAttribute', AttributeSchema);
export default Attribute;
