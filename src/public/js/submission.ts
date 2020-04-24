const url = 'http://localhost:8080';
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

    fever: any;
    tiredness: any;
    chills: any;
    digestion: any;
    smell: any;
    congestion: any;
    cough: any;
    breathing: any;

}

class Use{
    tested: any = false;
    testedResult: any = "-1";

    //TODO: fill out Symptoms Interface in Symptoms.ts
    Symptoms: symptoms= {fever:0, tiredness: 0, chills: 0, digestion: 0, smell: 0, congestion: 0, cough: 0, breathing: 0};


    constructor(){
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

function getSubmissionValues(): Use{

    let user = new Use();
    let feverValue = $('input[name="fever"]:checked').val();
    let tirednessValue = $('input[name="tiredness"]:checked').val();
    let chillsValue = $('input[name="Chills"]:checked').val();
    let digestionValue = $('input[name="digestion"]:checked').val();
    let smellValue = $('input[name="smell"]:checked').val();
    let congestionValue = $('input[name="congestion"]:checked').val();
    let coughValue = $('input[name="dry-cough"]:checked').val();
    let breathingValue = $('input[name="difficulty-breathing"]:checked').val();
    let testedCheckValue = $('input[name="tested-check"]:checked').val();
    let testedResultsValue = $('input[name="results"]:checked').val();
    user.Symptoms = {fever:feverValue,tiredness: tirednessValue,chills: chillsValue,digestion: digestionValue,smell: smellValue,congestion: congestionValue,cough: coughValue,breathing: breathingValue};
    user.tested = testedCheckValue;
    user.testedResult = testedResultsValue;
    return user;
}

function submissionCreate(){
    (async()=>{
        console.log('here');

        let username = "placeholderUsername";
        let password = "placeholderPassword";
        const newURL = url + '/symptoms/sample/update';
        //TODO: On Submit button press, check if all fields have been filled out
        const data = getSubmissionValues();
        console.log(data)
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
