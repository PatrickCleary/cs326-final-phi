"use strict";
//TODO: add all fields
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username, password) {
        this.tested = false;
        this.testedResult = "-1";
        //TODO: fill out Symptoms Interface in Symptoms.ts
        this.Symptoms = { fever: 0, tiredness: 0, chills: 0, digestion: 0, smell: 0, congestion: 0, cough: 0, breathing: 0 };
        this.username = username;
        this.password = password;
    }
}
exports.User = User;
