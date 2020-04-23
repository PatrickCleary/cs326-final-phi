//TODO: add all fields

export default interface symptoms{

    fever: any;
    tiredness: any;
    chills: any;
    digestion: any;
    smell: any;
    congestion: any;
    cough: any;
    breathing: any;
}

export class User{


    private username : string;
    private password : string;
    tested: any = false;
    testedResult: any = "-1";

    //TODO: fill out Symptoms Interface in Symptoms.ts
    Symptoms: symptoms= {fever:0, tiredness: 0, chills: 0, digestion: 0, smell: 0, congestion: 0, cough: 0, breathing: 0};


    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
    
}   
