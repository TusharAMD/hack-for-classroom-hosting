import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from './AuthContext';


function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { user, login, logout } = useAuth();
    
    const notify = (notification) => toast(notification, {theme: "dark"});

    async function onSubmitHandler(){
        console.log({username,password})
        const response = await axios.post('http://127.0.0.1:5000/api/login', {username,password});
        console.log(response)
        console.log(response.data.status)
        notify(response.data.status)
        setUsername("")
        setPassword("")

        if (response.data.status == "✅ Success"){
            let role = response.data.role
            login({username,role});
        }

    }

    return(<>
    
    <div style={{display:"flex",justifyContent:"center"}}>
        <div className = "registration">
            <div style={{fontSize:"2em"}}>Login</div>

            <div style={{display:"flex",justifyContent:"left",flexDirection:"column",alignItems:"center"}}>
                
                <div style={{width:"70%", margin:"1em"}}>
                    <Form.Control type="text"placeholder="Enter User Name"
                        value = {username}
                        onChange = {(e)=>{
                            setUsername(e.target.value)
                        }}
                    />
                </div>
                <div style={{width:"70%", marginBottom:"1em"}}>
                    <Form.Control type="password"placeholder="Enter Password"
                        value = {password} 
                        onChange = {(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                </div>

                <Button onClick={onSubmitHandler} style={{ marginBottom:"1em"}} variant="dark">Submit</Button>
                <ToastContainer />
            </div>
        </div>
    </div>
    </>)
}

export default Login