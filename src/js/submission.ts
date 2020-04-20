const url = 'http://localhost:8080/submission';
import $ from 'jquery';

const placeholdervalue = 'placeholder';

function yesTested(){
    ($('#results-positive') as any).disabled = false;
    ($("#results-negative") as any).disabled = false;
    ($("#results-na") as any).disabled = true;
    ($("results-na") as any).checked = false;


}

function noTested(){
    ($('#results-positive') as any).disabled = true;
    ($("#results-negative") as any).disabled = true;
    ($("#results-na") as any).disabled = false;
    ($("results-na") as any).checked = true;

}


function submissionCreate(){
    (async()=>{
        
        let username = "placeholderUsername";
        let password = "placeholderPassword";
        const newURL = url + '/create?username=' + placeholdervalue;
        console.log('creating new submission. fetching:' + newURL);
        const responseValue = await fetch(newURL);
        const JSONResponse = await responseValue.json();
        if(JSONResponse['result']!=='error'){
            console.log('submission created');
        }else{
            console.log('submission failed!');
        }



    })


}
