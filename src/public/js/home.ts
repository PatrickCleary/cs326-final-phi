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
        

    })();
}