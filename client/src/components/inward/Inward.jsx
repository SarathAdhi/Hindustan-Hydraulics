import './inward.scss'
//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import API from './api'


const Inward = () => {

  //const [data, setData] = useState({});

    
  return (
    <table class="table">
  <thead>
    <tr>
      <th div="col">Doc Number</th>
      <th div="col">Date</th>
      <th div="col">Supplier name</th>
      <th div="col">SMC</th>
      <th div="col">GEN</th>
      <th div="col">INS</th>
      <th div="col">HYD</th>
      <th div="col">HOS</th>
      <th div="col">TC Counter</th>
      <th div="col">LC Counter</th>
      <th div="col">Materials Recieved</th>
      <th div="col">Security inward</th>
      <th div="col">Reg Number</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td div="row">CEW/252</td>
      <td>2022-12-29</td>
      <td>Zuva Inc</td>
      <td>false</td>
      <td>false</td>
      <td>false</td>
      <td>false</td>
      <td>false</td>
      <td>false</td>
      <td>false</td>
      <td>false</td>
      <td>false</td>
      <td>null</td>
    </tr>
    
  </tbody>
</table>
  )
}

export default Inward