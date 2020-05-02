import { raw } from "body-parser";

//TODO: Fix double variable names, scope issue, url2/postData2/newURL2,data2

const url2 = '/symptoms';
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
        updateTable(responseValue);
        updateChart(filter,responseValue);
        updateMap(responseValue);
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

var c3 = require("c3");
var d3 = require("d3");

export function updateChart(symptom:string,symptomTable:any){


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
let L = require("leaflet");
var map = L.map('map').setView([42.35, -71.08], 9);
let jQuery=require("jquery");
let geojsonlayer = L.geoJson();
L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
      {
        attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
        maxZoom: 17,
        minZoom: 8
      }).addTo(map);


export function updateMap(symptoms:any){
    
    // load a tile layer
    let counties = ["Barnstable","Berkshire","Bristol","Dukes","Essex","Franklin","Hampden",
                    "Hampshire","Middlesex","Nantucket","Norfolk","Plymouth","Suffolk","Worcester"];

    let totals:any = []
    for(let i =0; i <counties.length; i++){
        totals[i] = symptoms[counties[i]].mild+
        symptoms[counties[i]].nes+
        symptoms[counties[i]].severe

        totals[i] = (totals[i]- symptoms[counties[i]].nes)/1100;
        totals[i] = 255 - Math.round(totals[i]*255);
    }

    map.removeLayer(geojsonlayer);
      jQuery.getJSON("/maps/COUNTIES_POLY.json",function(hoodData: any){

     geojsonlayer = L.geoJson(hoodData, {style: function(feature:any) {
        switch(feature.properties.NAME){
            case('Barnstable'): return {color: 'rgb(255, '+totals[0] + ','+ totals[0]+')'};
            case('Berkshire'): return {color: 'rgb(255, '+totals[1] + ','+ totals[1]+')'};
            case('Bristol'): return {color: 'rgb(255, '+totals[2] + ','+ totals[2]+')'};
            case('Dukes'): return {color: 'rgb(255, '+totals[3] + ','+ totals[3]+')'};
            case('Essex'): return {color: 'rgb(255, '+totals[4] + ','+ totals[4]+')'};
            case('Franklin'): return {color: 'rgb(255, '+totals[5] + ','+ totals[5]+')'};
            case('Hampden'): return {color: 'rgb(255, '+totals[6] + ','+ totals[6]+')'};
            case('Hampshire'): return {color: 'rgb(255, '+totals[7] + ','+ totals[7]+')'};
            case('Middlesex'): return {color: 'rgb(255, '+totals[8] + ','+ totals[8]+')'};
            case('Nantucket'): return {color: 'rgb(255, '+totals[9] + ','+ totals[9]+')'};
            case('Norfolk'): return {color: 'rgb(255, '+totals[10] + ','+ totals[10]+')'};
            case('Plymouth'): return {color: 'rgb(255, '+totals[11] + ','+ totals[11]+')'};
            case('Suffolk'): return {color: 'rgb(255, '+totals[12] + ','+ totals[12]+')'};
            case('Worcester'): return {color: 'rgb(255, '+totals[13] + ','+ totals[13]+')'};
        
        }
    }}).addTo(map);

     
}); 
}
