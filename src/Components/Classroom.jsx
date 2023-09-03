import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Classroom(){
    
    const navigate = useNavigate();
    const [data,setData] = useState([])
    const [loaded,setLoaded] = useState(false)
    const { user, login, logout } = useAuth();

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("http://127.0.0.1:5000/api/getclass")
            setData(res.data.data)
            console.log(res.data.data)
            setLoaded(true)
            }
        fetchData();
      }, []);

    function BasicExample(props) {
        
        return (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.thumbnail}/>
            <Card.Body>
              <Card.Title>{props.subjectName}</Card.Title>
              <Card.Text>
                {props.subjectDesc}
              </Card.Text>
              <Button onClick={()=>{
                navigate(props.subjectName)
              }
              } variant="dark">Go to Course</Button>
            </Card.Body>
          </Card>
        );
      }

return(loaded && <>
    <div className = "classroom">
        {user && user.role && <div className="addnewclass">
            <Button style={{padding:"1em",margin:"1em"}} variant="dark"
                onClick = {()=>{
                    navigate("/addclass");
                }}
                disabled = {!user.role}
            >Add New Course 
            <span class="material-symbols-outlined">
                add_circle
            </span>
            </Button>
            
        </div>}
        <div className="grid-container">

            {data.map((ele, index) => {
                return(<>
                    <div className="grid-item">
                        <BasicExample subjectName = {ele.coursename} subjectDesc = {ele.desc} thumbnail = {ele.img}/>
                    </div>
                </>)
            })};
        </div>
    </div>
</>)
}

export default Classroom