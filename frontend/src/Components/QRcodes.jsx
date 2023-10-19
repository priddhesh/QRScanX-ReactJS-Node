import React, { useState, useEffect } from "react";

function QRcodes() {
  const [qrData, setQrData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const email = JSON.parse(localStorage.getItem("user"))["email"];
    let result = await fetch("http://localhost:5000/qrcodes", {
      method: "get",
    });
    result = await result.json();
    setQrData(result);
  };

  const deleteData = async (e)=>{
    let id = e.currentTarget.id;
    let uniqueID = document.getElementById(`id${id}`).innerText;
    console.log(uniqueID);
   
    let result = fetch(`http://localhost:5000/qrcodes/${uniqueID}`,{
        method: "delete",
    });
    setTimeout(() => {
        getData();
    }, 50);
}


  return (
    <div className="productList">
      <h3>Saved Data</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
            <th scope="col">Date</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
        {qrData.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td style={{"display":"none"}} id={`id${index}`}>{item.id}</td>
        <td id={`content${index}`}>
          <a href={item.content}>{item.content}</a>
        </td>
        <td id={`date${index}`}>{item.date.substring(0, 10)}</td>
        <td>
          <button type="button" onClick={deleteData} className="btn btn-danger" id={`${index}`}>
            Delete
          </button>
        </td>
      </tr>
    ))}
        </tbody>
      </table>
    </div>
  );
}

export default QRcodes;
