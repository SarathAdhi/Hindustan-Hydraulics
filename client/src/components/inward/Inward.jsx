import './inward.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from './api'


const Inward = () => {

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        // const token = localStorage.getItem('token');
        const api = new API('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZmI5ZGY1Y2Q5YWUyNDlkMmI0N2JhZWMwMTljOTNkYzQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM5NDUyOTB9.YxvO4knK1Uo1WzNelmpjZSdPwASaJtozo9u_Oguo8F-9oCe0FYdKFnpFCWAoVV9aJo5DoPYovB-40MGgtWcsukxPDouf49m5VKI60gWohq5aAl_IKm_c0edNpvbhebFaGX9M8O3lpIbgqlNZswtzdeOAsu8_QNQmO-sb1PWqOMUgk6tkdEWvcgukeaPXMcxMQprggezB97JCL3eIkJ9f9vLXukQUPIllgyTrtYowUjSipqc0xr1aoQm4BjbD_PcAHDuLKOlKDD-sU70z9IP6bxedR-5njvY6a3FenVi8KSxqp2wD82VoZF7jE0-23XCG_FrczlrC-qTub_Gw5vNfzQ')
        const response = api.makeCall('inward/get')
        console.log("data",response.data)

        const result = [];
        
        // eslint-disable-next-line
        response.data.data.forEach((data,index)=>{{
          // console.log(data)
          const results = {};
          data.store.forEach((store)=>{
            results[store.store_name] = store.received;
          })
          results.inward_reg_no = data.inward_reg_no;
          results.date = data.date;
          results.inward_doc_no = data.inward_doc_no;
          results.supplier_name = data.supplier_name;
          results.security_inward = data.security_inward;
          results.materials_received = data.materials_received;

          result.push(
            <tr>
              <th scope="row">{results.inward_doc_no}</th>
              <td>{results.date}</td>
              <td>{results.supplier_name}</td>
              <th>{results.smc ? "RECEIVED" : "No"}</th>
              <th>{results.general ? "RECEIVED" : "No"}</th>
              <th>{results.instrumentation ? "RECEIVED" : "No"}</th>
              <th>{results.hydraulics ? "RECEIVED" : "No"}</th>
              <th>{results.hose ? "RECEIVED" : "No"}</th>
              <th>{results.tc_counter ? "RECEIVED" : "No"}</th>
              <th>{results.lc_counter ? "RECEIVED" : "No"}</th>
              <th>{results.materials_received ? "Yes" : "No"}</th>
              <th>{results.security_inward ? "Yes" : "No"}</th>
              <td>{results.inward_reg_no ? results.inward_reg_no : "None"}</td>
            </tr>
          )
        }})
        console.log("Results",result)

        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
    
  }, []);

  return (
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Doc No</th>
      <th scope="col">Date</th>
      <th scope="col">Supplier name</th>
      <th scope="col">SMC</th>
      <th scope="col">GEN</th>
      <th scope="col">INS</th>
      <th scope="col">HYD</th>
      <th scope="col">HOS</th>
      <th scope="col">TC Counter</th>
      <th scope="col">LC Counter</th>
      <th scope="col">Materials Recieved</th>
      <th scope="col">Security inward</th>
      <th scope="col">Reg No.</th>
    </tr>
  </thead>
  <tbody>
    
    {data}
  </tbody>
</table>
  )
}

export default Inward