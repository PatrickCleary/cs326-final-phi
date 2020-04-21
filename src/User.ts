import Symptoms from './Symptoms';

//TODO: add all fields
export class User{


    private username : string;
    private password : string;
    tested: boolean = false;

    //TODO: fill out Symptoms Interface in Symptoms.ts
    Symptoms: Symptoms= {cough: 0, fever:0};


    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
    
}   
