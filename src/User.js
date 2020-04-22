"use strict";
exports.__esModule = true;
//TODO: add all fields
var User = /** @class */ (function () {
    function User(username, password) {
        this.tested = false;
        //TODO: fill out Symptoms Interface in Symptoms.ts
        this.Symptoms = { cough: 0, fever: 0 };
        this.username = username;
        this.password = password;
    }
    return User;
}());
exports.User = User;
