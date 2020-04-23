import {User} from "./User"
import {postData} from "./postData"

///////////////////////////////////////////////FORM PAGE///////////////////////////////////////////////

const urlForm = 'http://localhost:8080/api/submission';

export function yesTested(){
    
    ($('#results-positive') as any)[0].disabled = false;
    ($("#results-negative") as any)[0].disabled = false;
    ($("#results-na") as any)[0].disabled=true;
    ($("#results-na") as any)[0].checked = false;


}

export function noTested(){
    ($('#results-positive') as any)[0].disabled=true;
    ($("#results-negative") as any)[0].disabled=true;
    ($("#results-na") as any)[0].disabled=false; 
    ($("#results-na") as any)[0].checked = true;

}


export function getSubmissionValues(): User{

    let user = new User("username","password");
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

export function submissionCreate(){
    (async()=>{
        console.log('here');
        
        let username = "placeholderUsername";
        let password = "placeholderPassword";
        const newURL = urlForm + '/create';
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
///////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////HOME PAGE///////////////////////////////////////////////

const urlHome = 'http://localhost:8080/api/home';

export function symptomRead(){
    (async()=>{
        let filter = $("#symptoms option:selected" ).text();
        const newURL = urlHome + '/read';
        console.log('getting symptom data: fetching' + newURL);
        console.log(filter);
        const data = {"symptom":filter}
        const responseValue = await postData(newURL,data);
        const JSONResponse = await responseValue.json();
        if(JSONResponse['result']!=='error'){
            console.log('data found');
        }else{
            console.log('failed!');
        }


    })();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

