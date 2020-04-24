import { raw } from "body-parser";

//TODO: Fix double variable names, scope issue, url2/postData2/newURL2,data2

<<<<<<< HEAD
const url2 = '/symptoms';
=======

const url2 = 'http://localhost:8080/symptoms';
>>>>>>> 94e1ef914a6ead509408b0b5287e51f60786cc33
const connect = async function postData(url: any, data: any) {
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
                             }).then((resp) => resp.json());
    return resp;
}


//sends symptom selected to DB, goal is to then get info from every User for that symptom.
//Issue is User class is currently defined in submission.ts bc of the import/export bug
//which needs to change
export function symptomRead(){
    (async()=>{
        let filter = (<HTMLSelectElement>document.getElementById('symptoms')).value;
        const newURL2 = url2 + '/filter';
        console.log('getting symptom data: fetching from ' + newURL2);
        console.log(filter);
        const data2 = {"symptom":filter}
        const responseValue = await connect(newURL2,data2);
<<<<<<< HEAD
        

        

    })();
}

function getWeights(){
    (async()=>{
        let filter = (<HTMLSelectElement>document.getElementById('symptoms')).value;
        //TODO: add none button to filters
        filter = '';
        if(filter.length > 1){
        const newURL2 = url2 + '/filter';
        console.log('getting symptom data: fetching from ' + newURL2);
        console.log(filter);
        const data2 = {"symptom":filter}
        const responseValue = await connect(newURL2,data2);
        }else{
            const newURL2 = url2 + '/all';
            const responseValue = await connect(newURL2, {})
        }
        

        

=======
        updateTable(responseValue);
        updateChart(filter,responseValue);
>>>>>>> 94e1ef914a6ead509408b0b5287e51f60786cc33
    })();
}

export function updateTable(symptomTable:any){

    console.log(symptomTable)
    let table = (<HTMLTableElement>document.getElementById("countyTable"));
    for(let i=1;i<15;i++){
        let row = table.rows[i];
        for(let j=1;j<7;j++){
            let counties = ["Barnstable","Berkshire","Bristol","Dukes","Essex","Franklin","Hampden","Hampshire","Middlesex","Nantucket","Norfolk","Plymouth","Suffolk","Worcester"];
            let num = 0;
            if(j==1) num = symptomTable[counties[i-1]].nes;
            if(j==2) num = symptomTable[counties[i-1]].mild;
            if(j==3) num = symptomTable[counties[i-1]].severe;
            if(j==4) num = symptomTable[counties[i-1]].positive;
            if(j==5) num = symptomTable[counties[i-1]].negative;
            if(j==6) num = symptomTable[counties[i-1]].untested;

            row.cells[j].innerHTML = num.toString();
        }
    }

}

export function updateChart(symptom:string,symptomTable:any){

    var c3 = require("c3");
    var d3 = require("d3");

    var rawData = [];
    var barData = [["none",0,0,0,0,0,0,0,0,0,0,0,0,0,0],["mild",0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   ["severe",0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
    let counties = ["Barnstable","Berkshire","Bristol","Dukes","Essex","Franklin","Hampden",
                    "Hampshire","Middlesex","Nantucket","Norfolk","Plymouth","Suffolk","Worcester"];

    for(let i=0;i<14;i++){
        for(let j=0;j<3;j++){
            if(j==0) rawData.push(symptomTable[counties[i]].nes);
            if(j==1) rawData.push(symptomTable[counties[i]].mild);
            if(j==2) rawData.push(symptomTable[counties[i]].severe);
        }
    }

    let count=0;
    for(let i=1;i<15;i++){
        for(let j=0;j<3;j++){
            barData[j][i] = rawData[count];
            count++;
        }
    }
    
    var chart = c3.generate({
        bindto: '#chart-1',
        data: {
            columns: barData,
            types: {
                none: 'bar',
                mild: 'bar',
                severe: 'bar',
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: [counties[0], counties[1], counties[2],counties[3],counties[4],counties[5],counties[6],
                counties[7],counties[8],counties[9],counties[10],counties[11],counties[12],counties[13]]
               }
        }
    });


}

