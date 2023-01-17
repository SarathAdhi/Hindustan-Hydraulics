import './inward.scss'
import React, { useState, useEffect } from 'react';

import axios from 'axios';



const Inward = () => {

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = localStorage.getItem('token');
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZmI5ZGY1Y2Q5YWUyNDlkMmI0N2JhZWMwMTljOTNkYzQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM5NDUyOTB9.YxvO4knK1Uo1WzNelmpjZSdPwASaJtozo9u_Oguo8F-9oCe0FYdKFnpFCWAoVV9aJo5DoPYovB-40MGgtWcsukxPDouf49m5VKI60gWohq5aAl_IKm_c0edNpvbhebFaGX9M8O3lpIbgqlNZswtzdeOAsu8_QNQmO-sb1PWqOMUgk6tkdEWvcgukeaPXMcxMQprggezB97JCL3eIkJ9f9vLXukQUPIllgyTrtYowUjSipqc0xr1aoQm4BjbD_PcAHDuLKOlKDD-sU70z9IP6bxedR-5njvY6a3FenVi8KSxqp2wD82VoZF7jE0-23XCG_FrczlrC-qTub_Gw5vNfzQ"
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('http://lab.zuvatech.com/inward/get?inward_doc_no=CEW/252', { headers });
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
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
    <tr>
      <th scope="row">CEW/252</th>
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