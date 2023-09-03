import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


function Register(){

    const [isTeacher, setIsTeacher] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const notify = (notification) => toast(notification, {theme: "dark"});

    async function onSubmitHandler(){
        //console.log({isTeacher,username,password,cpassword})
        if (password!=cpassword){
            notify("❌ Passwords don't match")
        }

        else{
            const response = await axios.post('http://127.0.0.1:5000/api/register', {isTeacher,username,password,cpassword});
            console.log(response)
            console.log(response.data.status)
            notify(response.data.status)
            setIsTeacher(false)
            setUsername("")
            setPassword("")
            setCPassword("")
        }
        
        
    }

    return(<>
    <div style={{display:"flex",justifyContent:"center"}}>
        <div className = "registration">
            <div style={{fontSize:"2em"}}>Register</div>

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
                <div style={{width:"70%", marginBottom:"1em"}}>
                    <Form.Control type="password"placeholder="Confirm Password"
                        value = {cpassword} 
                        onChange = {(e)=>{
                            setCPassword(e.target.value)
                        }}
                    />
                </div>

                <Form.Check
                    type="switch"
                    label={`Are you Teacher?`}
                    onChange = {(e)=>{
                        setIsTeacher(e.target.checked)
                    }}
                />

                <Button onClick={onSubmitHandler} style={{ marginBottom:"1em"}} variant="dark">Submit</Button>
                <ToastContainer />
            </div>
        </div>
    </div>
    </>)
}

export default Register