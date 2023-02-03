import axios from 'axios'

class API{
    constructor(token){
        this.token = token;
    }

    async makeCall(uri){
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZmI5ZGY1Y2Q5YWUyNDlkMmI0N2JhZWMwMTljOTNkYzQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM5NDUyOTB9.YxvO4knK1Uo1WzNelmpjZSdPwASaJtozo9u_Oguo8F-9oCe0FYdKFnpFCWAoVV9aJo5DoPYovB-40MGgtWcsukxPDouf49m5VKI60gWohq5aAl_IKm_c0edNpvbhebFaGX9M8O3lpIbgqlNZswtzdeOAsu8_QNQmO-sb1PWqOMUgk6tkdEWvcgukeaPXMcxMQprggezB97JCL3eIkJ9f9vLXukQUPIllgyTrtYowUjSipqc0xr1aoQm4BjbD_PcAHDuLKOlKDD-sU70z9IP6bxedR-5njvY6a3FenVi8KSxqp2wD82VoZF7jE0-23XCG_FrczlrC-qTub_Gw5vNfzQ"

        const headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.get(uri, { headers });
        return response
    }
}