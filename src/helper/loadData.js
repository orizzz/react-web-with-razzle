import 'isomorphic-fetch';
import API_URL from '../config'


function resourceType(type,body){
    if(type = "Detail" ){
        return fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
        .then(responseJson => {
            return responseJson
        }).catch((error) => {
            console.log(error)
        })
    }
    else if (type="search"){
        fetch(API_URL,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(responseJson => { 
            if(responseJson.status){
                return responseJson
            }else{
                alert("Data tidak ditemukan");
            }
        });
    }
    else if (type="list"){
        fetch(API_URL,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(responseJson => { 
            if(responseJson.status){
                return responseJson
            }else{
                alert("ERROR");
            }
        });
    }
}


export default resourceType