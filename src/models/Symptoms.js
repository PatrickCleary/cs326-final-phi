"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SymptomSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
<<<<<<< HEAD
    fever: { type: Number, default: 0, required: true },
    tiredness: { type: Number, default: 0, required: true },
    chills: { type: Number, default: 0, required: true },
    digestion: { type: Number, default: 0, required: true },
    smell: { type: Number, default: 0, required: true },
    congestion: { type: Number, default: 0, required: true },
    cough: { type: Number, default: 0, required: true },
    breathing: { type: Number, default: 0, required: true }
=======
    fever: { type: Number, "default": 0, required: true },
    tiredness: { type: Number, "default": 0, required: true },
    chills: { type: Number, "default": 0, required: true },
    digestion: { type: Number, "default": 0, required: true },
    smell: { type: Number, "default": 0, required: true },
    congestion: { type: Number, "default": 0, required: true },
    cough: { type: Number, "default": 0, required: true },
    breathing: { type: Number, "default": 0, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
>>>>>>> 19ecd71bc3ca44430953933fb88de612383cc539
});
SymptomSchema.set('toJSON', { virtuals: true });
//Export model
module.exports = mongoose.model('Symptom', SymptomSchema);
