import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

function ClassroomQues() {
    const [data, setData] = useState([])
    const [loaded,setLoaded] = useState(false)
    const { id } = useParams();

    useEffect(()=>{
        axios.post("http://127.0.0.1:5000/api/getquestions", { subject:id }).then(
            (res)=>{
                console.log(res)
                setData(res.data.data)
                setLoaded(true)
            }
        )
    },[])

  function QuestionItem() {
    const { user, login, logout } = useAuth();
    const { id } = useParams();

    

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [marks, setMarks] = useState("");

    const notify = (notification) => toast(notification, {theme: "dark"});

    

    if (user && user.role) {
      return (
        <div className='ques-items'>
          <Form>
            <Form.Group className='mb-3' controlId='questionInput'>
              <Form.Label>Question</Form.Label>
              <Form.Control
                type='text'
                placeholder='Define Photosynthesis'
                onChange={(e)=>{setQuestion(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='answerTextarea'>
              <Form.Label>Answer</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Leave Blank if you want LLM to handle'
                onChange = {(e)=>setAnswer(e.target.value)}
              />
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type='number'
                placeholder='5'
                onChange = {(e) => setMarks(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button
            variant='dark'
            onClick={() => {
              console.log({ question, answer, marks, id });
              axios.post("http://127.0.0.1:5000/api/addquestions", { question, answer, marks, subject:id }).then(
                (res)=>{
                    console.log(res)
                    notify(res.data.status)
                }
              )
            }}
          >
            Add Question
          </Button>

          
        </div>
      );
    } else {
      return <>Access Denied!!</>;
    }
  }

  function QuestionList(props){
    return(
        <Accordion style = {{width:"90%"}}>
            <Accordion.Item eventKey={props.id}>
                <Accordion.Header>{props.question}</Accordion.Header>
                <Accordion.Body>
                {props.answer}
                </Accordion.Body>
                <Accordion.Body>
                Marks : {props.marks}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
  }

  return (
    <>
      <div className='classroomques'>
        <QuestionItem />
        <ToastContainer/>
        
      </div>

      <div style = {{width:"100%", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
        <div style ={{border:"1px solid white", padding:"1em", margin:"1em", color:"white"}}>Questions in Database:</div>
        {loaded && data.map((ele, index) => {
        return(<>
            <QuestionList question = {ele.question} answer = {ele.answer} marks = {ele.marks} id = {index}/><br/>
        </>)
        })}
      
      </div>
    </>
  );
}

export default ClassroomQues;
