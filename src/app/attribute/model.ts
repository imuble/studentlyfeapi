import mongoose = require('mongoose');
import UserSchema from '../user/model';

export interface IAttribute extends mongoose.Document {
    name: string,
    suffix?: string,
    description: string,
    defaultValue?: Number,
    imageUrl: string
};

export const AttributeSchema = new mongoose.Schema({
    name: {type:String, required: true, index: true},
    description: {type: String, required: true},
    suffix: {type:String},
    defaultValue: {type: Number, default: 0},
    imageUrl: {type: String}
});

AttributeSchema.pre('remove', function (next) {
    UserSchema.update({}, {$pull: {'attributes.$.attribute': this._id}}, {multi: true}, (err) => {
        next();
    });
});

const Attribute = mongoose.model<IAttribute>('Attribute', AttributeSchema);
export default Attribute;
