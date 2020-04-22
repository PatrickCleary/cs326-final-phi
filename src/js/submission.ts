const url = 'http://localhost:8080/api/submission';
const placeholdervalue = 'placeholder';

function yesTested(){
    
    ($('#results-positive') as any)[0].disabled = false;
    ($("#results-negative") as any)[0].disabled = false;
    ($("#results-na") as any)[0].disabled=true;
    ($("#results-na") as any)[0].checked = false;


}

function noTested(){
    ($('#results-positive') as any)[0].disabled=true;
    ($("#results-negative") as any)[0].disabled=true;
    ($("#results-na") as any)[0].disabled=false; 
    ($("#results-na") as any)[0].checked = true;

}


interface symptoms{

    cough: number;
    fever: number;
    tiredness: number;
    chills: number;
    digestion: number;
    loss: number;
    headache: number;
    breathing: number;

}

class User{


    private username : string;
    private password : string;
    tested: boolean = false;

    //TODO: fill out Symptoms Interface in Symptoms.ts
    Symptoms: symptoms= {cough: 0, fever:0, tiredness: 0, chills: 0, digestion: 0, loss: 0, headache: 0, breathing: 0};


    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
    
}  

async function postData(url: any, data: any) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
}

function submissionCreate(){
    (async()=>{
        console.log('here');
        
        let username = "placeholderUsername";
        let password = "placeholderPassword";
        const newURL = url + '/create';
        const data = new User(username,password);
        //const data = {'username':username};
        console.log('creating new submission. fetching:' + newURL);
        const responseValue = await postData(newURL,data);
        const JSONResponse = await responseValue.json();
        if(JSONResponse['result']!=='error'){
            console.log('submission created');
        }else{
            console.log('submission failed!');
        }



    })();


}
