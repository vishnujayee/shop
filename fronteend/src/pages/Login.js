import { Button, Col, Container, FormGroup, Row, Form, Alert } from 'react-bootstrap'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import './Signup.css'
import { useLoginMutation } from '../services/appapi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [login, { error, isLoading, isError }] = useLoginMutation();
  const [dataok, setdataok] = useState(true);
  const [load, setload] = useState(false);
  const navigate = useNavigate();
  async function handlelogin(e) {
    e.preventDefault();
    setload(true);
    if (!email || email.length === 0 || !email.includes("@") || !password || password.split().length === 0 || password.length < 8) {
      setdataok(false);
      setload(false);
      return;
    }
    const data = await login({Email:email, password}).unwrap()
      // if(isError || error) {
      //   setload(false);
      //   return;
      // }
      setemail("");
      setpassword("");
      console.log(data);
      localStorage.setItem("userauth", data.token);
      setload(false);
      navigate("/");
  }
  return (
    load ? <div style={{ margin: '18px 8px' }}><Skeleton style={{ margin: '5px 8px' }} />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" style={{ margin: '5px 8px' }} />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" style={{ margin: '5px 8px' }} />
      <Skeleton animation={false} />
    </div>
      : <Container >
        <Row className='box'>
          <Col md={6} className='login_container'>
            {isError && <Alert variant='danger'>{error.data}</Alert>}
            {!dataok && <Alert variant='danger'>{"Please Enter Valid Crediental"}</Alert>}
            <Form style={{ width: '100%' }} onSubmit={handlelogin}>
              <p>Login to your Account </p>
              <FormGroup>
                <Form.Label>Email ADDRESS</Form.Label>
                <Form.Control type="text" placeholder="something@gmail.com" value={email} onChange={(e) => { setemail(e.target.value) }} required />
              </FormGroup>
              <FormGroup>
                <Form.Label>PASSWORD</Form.Label>
                <Form.Control type="password" placeholder=" Enter password" value={password} onChange={(e) => { setpassword(e.target.value) }} required />
              </FormGroup>
              <FormGroup>
                <Button type='sumbit' disabled={load} >LOGIN</Button>
              </FormGroup>
            </Form>
            <p>Don't have ACCOUNT ? <Link to="/Signup">Create New Account </Link></p>
          </Col>
          <Col md={6} className='login_image_container'></Col>
        </Row>
      </Container>
  )
}

export default Login