import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Register from './Components/Register'
import Login from './Components/Login'
import Classroom from './Components/Classroom'
import AddClass from './Components/AddClass';
import ClassroomQues from './Components/ClassroomQues'
import CurrentClassroom from './Components/CurrentClassroom'
import Assignment from './Components/Assignment';
import AnswerSheet from './Components/AnswerSheet';

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './Components/AuthContext';

function App() {

  const { user, login, logout } = useAuth();

  return (
    <>
      <Router>
        <div className="App">
          <Navbar bg="dark" data-bs-theme="dark" expand="lg"
            style={{padding:"1em"}}
          >
            <Navbar.Brand as={Link} to="/">LLM-Grader</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/pdf">Answer Sheet</Nav.Link>
                <Nav.Link as={Link} to="/classroom">Classrooms</Nav.Link>
              </Nav>

              <Nav className="ml-auto">
                {user && <Nav.Item style={{color:"rgba(255,255,255,0.55)",paddingTop:"0.5em",paddingBottom:"0.5em"}}>{`Hello ${user.username} !!`}</Nav.Item>}
                {user==null && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                {user && <Nav.Link
                onClick = {()=>{
                  logout()
                }}
                >Logout</Nav.Link>}
                <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        <Routes>
                <Route exact path='/' element={<></>}></Route>
                <Route exact path='/pdf' element={<AnswerSheet/>}></Route>
                <Route exact path='/classroom' element={<Classroom/>}></Route>
                <Route exact path='/register' element={<Register/>}></Route>
                <Route exact path='/login' element={<Login/>}></Route>
                <Route exact path='/addclass' element={<AddClass/>}></Route>
                <Route exact path='/classroom/:id/addques' element={<ClassroomQues/>}></Route>
                <Route exact path='/classroom/:id/' element={<CurrentClassroom/>}></Route>
                <Route exact path='/classroom/:id/:assignment' element={<Assignment/>}></Route>
        </Routes>
        </div>
    </Router>
    </>
  )
}

export default App
