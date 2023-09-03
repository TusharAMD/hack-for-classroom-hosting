import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { ToastContainer, toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge';

function CurrentClassroom(){
    const {id} = useParams();
    const navigate = useNavigate();
    const { user, login, logout } = useAuth();
    const [data, setData] = useState([])
    const notify = (notification) => toast(notification, {theme: "dark"});

    

    useEffect(()=>{
        axios.post("http://127.0.0.1:5000/api/getAssignments", {subject:id}).then((res)=>{
            console.log(res)
            setData(res.data.data)
        })
    },[])

    return(
    <>
    <div className='currclasses'>
    {user && <div style={{
        display:"flex",
        justifyContent:"flex-end"
    }}>
        <Button
            disabled = {!user.role}
            onClick = {()=>{
                navigate("addques")
            }}
            style = {{
                margin:"0.5em"
            }}
            variant = "dark"
        >
            Add Question
        </Button>

        <Button
            disabled = {!user.role}
            onClick = {()=>{
                axios.post("http://127.0.0.1:5000/api/addAssignments",{subject:id})
                    .then((res)=>{
                        console.log(res)
                        notify(res.data.status)
                    })
            }}
            style = {{
                margin:"0.5em"
            }}
            variant = "dark"
        >
            Add Assignment
        </Button>
    </div>}
    <div>
        <ListGroup >
        {data.map((ele, index) => {
            return(<>
                <div className="grid-item">
                    <ListGroup.Item action variant="info"
                    style={{margin:"0.5em", height:"4em"}}
                    onClick={()=>{navigate(ele.assignmentID)}}
                    >
                        <div style={{display:"flex", justifyContent:"space-between", textAlign:"left"}}>                    
                            Assignment ID : {ele.assignmentID} on {ele.date}
                            <Badge bg="primary" pill>20 marks</Badge>
                        </div>
                    </ListGroup.Item>
                </div>
            </>)
        })};
        </ListGroup>
    </div>
    <ToastContainer/>
    </div>
    </>
    )
}

export default CurrentClassroom