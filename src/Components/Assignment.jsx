import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "./AuthContext"
import axios from "axios";
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import FileUpload from "./FileUpload";

function Assignment(){
    const { user, login, logout } = useAuth();
    const {id,assignment} = useParams()
    const [data, setData] = useState([])
    const [status, setStatus] = useState("")

    useEffect(()=>{
        if(user!=null){
        console.log("Assignment")
        axios.post(
            "http://127.0.0.1:5000/api/makeQuestions",
            {subject:id, assignment:assignment, username:user.username}
        ).then((res)=>{
            console.log(res)
            setData(res.data.data)
            setStatus(res.data.status)
        })
        }
    },[user])
    if(status == "Attended"){
        return(
            <>
                <div style={{ margin: "1em" }}>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Marks Obtained</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((ele, index) => (
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{ele.question}</td>
                        <td>{ele.marksObtained}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </div>
                
            </>
        )
    }
    else if(status == "Now created" || status == "Not Attended"){
        return(<>
        <div style={{margin:"1em", fontFamily:"Poppins"}}>
        <div style = {{color:"white"}}>Question Paper:</div>
        <ListGroup as = "ol" numbered>
        {data.map((ele, index) => (
            <>
            <ListGroup.Item  as="li"
            style = {{display:"flex", justifyContent:"flex-start", textAlign:"left", margin:"0.2em",padding:"0.5em"}}
            > {ele.question}</ListGroup.Item>
            </>
        ))}
        </ListGroup>
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            width: "100%",
            alignItems:"center"
        }}>
            <FileUpload />
        </div>
        </div>
        </>
        )
    }
}

export default Assignment