import Symptoms from './Symptoms';


export class User{


    private username : string;
    private password : string;
    tested: boolean = false;
    Symptoms: Symptoms= {cough: 0, fever:0};


    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
    
}   
