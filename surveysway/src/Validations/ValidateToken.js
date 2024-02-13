import axios from 'axios';

const ValidateToken = async(exp,usertoken,setusertoken,setExp) => {
    const currentTime = Math.floor(Date.now() / 1000); 
    if (exp-currentTime<=30) {
        const newToken= await axios.post('http://localhost:3000/GetNewToken',usertoken )
        console.log(newToken);
        setusertoken(newToken.data.usertoken)
        setExp(newToken.data.exp)
    }

}

export {ValidateToken}