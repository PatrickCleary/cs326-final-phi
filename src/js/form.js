function yesTested(){
    document.getElementById("results-positive").disabled = false;
    document.getElementById("results-negative").disabled = false;
    document.getElementById("results-na").disabled = true;
    document.getElementById("results-na").checked = false;


}

function noTested(){
    document.getElementById("results-positive").disabled = true;
    document.getElementById("results-negative").disabled = true;
    document.getElementById("results-na").disabled = false;
    document.getElementById("results-na").checked = true;
}

