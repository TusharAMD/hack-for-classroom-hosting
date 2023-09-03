import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { useParams } from 'react-router-dom';

function FileUpload() {

  const [formDataUp, setFormDataUp] = useState()
  const [filename, setFilename] = useState("Drag and drop a PDF file here, or click to select one.")
  const { user, login, logout } = useAuth();
  const {id,assignment} = useParams()

  const notify = (notification) => toast(notification, {theme: "dark"});

  const onDrop = useCallback((acceptedFiles) => {

    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append('file', file);
    let jsonString = JSON.stringify({username:user.username, subject:id, assignment})
    let blob = new Blob([jsonString], { type: "application/json" });
    formData.append("json_data", blob, "data.json");
    //console.log({username:user.username, subject:id, assignment})
    setFormDataUp(formData)
    setFilename(file.name)
    
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
    <div style={{
            backgroundColor:"rgba(255,255,255,0.5)",
            width: "80%",
        }}>
      <div  {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>{filename}</p>
      </div>
      
      <ToastContainer/>
    </div>
    <Button 
      variant = "dark"
      onClick={()=>{
        axios.post('http://127.0.0.1:5000/api/upload', formDataUp, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        })
        .then((response) => {
            console.log(response)
            notify(response.data)
        })
        .catch((error) => {
        });
      }}
      style = {{margin:"0.5em"}}>Submit</Button>
    </>
  );
}

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  height: "15em",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  fontFamily:"Poppins"
};

export default FileUpload;
