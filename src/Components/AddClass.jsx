import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';

function AddClass(){

    const [coursename,setCoursename] = useState("")
    const [desc,setDesc] = useState("")

    return(<>
        <div className='classroomadd'>
            <div className='ques-items'>
                <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"
                style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"flex-start",
                    alignItems:"flex-start"
                }}
                >
                <Form.Label>Class Name</Form.Label>
                    <Form.Control type="text" placeholder="Physics 101" 
                        onChange={(e)=>{setCoursename(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"
                style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"flex-start",
                    alignItems:"flex-start"
                }}
                >
                <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Physics 101 by John Doe, First Year Students" 
                        onChange={(e)=>{setDesc(e.target.value)}}
                    />
                </Form.Group>
                
                </Form>

                <Button variant = "dark"
                    onClick = {async ()=>{
                        console.log("clicked")
                        const res = await axios.post("http://127.0.0.1:5000/api/addclass", {coursename,desc})
                        console.log(res)
                    }}
                >Add Class</Button>
            </div>
        </div>
    </>)
}

export default AddClass