import './inward.scss'

const Inward = () => {

  let [responseData, setResponseData] = React.useState('')
    // fetches data
    const fetchData = (e) => {
        e.preventDefault()
        api.getData()
        .then((response)=>{
            setResponseData(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    
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