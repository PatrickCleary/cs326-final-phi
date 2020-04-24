"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 30 },
<<<<<<< HEAD
    tested: { type: Boolean, default: false },
    testedResult: { type: Number, default: -1, enum: [-1, 0, 1] },
    symptom: { type: Schema.Types.ObjectId, ref: 'Symptom' }
=======
    tested: { type: Boolean, "default": false },
    testedResult: { type: Number, "default": -1, "enum": [-1, 0, 1] },
    symptom: { type: Schema.Types.ObjectId, ref: 'Symptom' },
    sex: { type: String },
    county: { type: String },
    age: { type: Number }
>>>>>>> 19ecd71bc3ca44430953933fb88de612383cc539
});
UserSchema.set('toJSON', { virtuals: true });
//Export model
module.exports = mongoose.model('User', UserSchema);
