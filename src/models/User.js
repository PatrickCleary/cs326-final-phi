var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 30 },
    tested: { type: Boolean, "default": false },
    testedResult: { type: Number, "default": -1, "enum": [-1, 0, 1] },
    symptom: { type: Schema.Types.ObjectId, ref: 'Symptom' }
});
UserSchema
    .virtual('url')
    .get(function () {
    return '/users/' + this._id;
});
UserSchema.set('toJSON', { virtuals: true });
//Export model
module.exports = mongoose.model('User', UserSchema);
