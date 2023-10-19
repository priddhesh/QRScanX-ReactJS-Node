import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { json } from 'react-router-dom';

function Scanner() {
  const [data, setData] = useState('No result');
  
  async function saveData(){
    const content = document.getElementById("content").innerText;
    const email = JSON.parse(localStorage.getItem("user"))['email'];

    let result = await fetch("http://localhost:5000/qrcodes",{
        method: "post",
        body: JSON.stringify({email, content}),
        headers : {
            "Content-Type":"application/json"
        }
    })
    result = await result.json();
    if(result){
        window.alert("Added!");
    }
  }
  return (
    <>
      <div style={{width : "40%", margin: "auto"}}>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
      { data=="No result"?
      <p>Result: No result</p>
      :
      <p>Result: {<a id='content' href={data}>{data}</a>} {data!="No result"?<button onClick={saveData}>Save</button>: ""}</p>
      }
      </div>
    </>
  );
}

export default Scanner;
