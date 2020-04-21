const url = 'http://localhost:8080/submission';

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


function submissionCreate(){
    (async()=>{
        console.log('here');
        
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



    })();


}
