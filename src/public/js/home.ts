//TODO: Fix double variable names, scope issue, url2/postData2/newURL2,data2

const url2 = 'http://localhost:8080/symptoms';
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
function symptomRead(){
    (async()=>{
        let filter = (<HTMLSelectElement>document.getElementById('symptoms')).value;
        const newURL2 = url2 + '/filter';
        console.log('getting symptom data: fetching from ' + newURL2);
        console.log(filter);
        const data2 = {"symptom":filter}
        const responseValue = await connect(newURL2,data2);
        updateTable(responseValue);
    })();
}

function updateTable(symptomTable:any){

    console.log(symptomTable)
    let table = (<HTMLTableElement>document.getElementById("countyTable"));
    for(let i=1;i<15;i++){
        let row = table.rows[i];
        for(let j=1;j<7;j++){
            let counties = ["Barnstable","Berkshire","Bristol","Dukes","Essex","Franklin","Hampden","Hampshire","Middlesex","Nantucket","Norfolk","Plymouth","Suffolk","Worcester"];
            let dataArray = ["nes","mild","severe","positive","negative","untested"];
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
