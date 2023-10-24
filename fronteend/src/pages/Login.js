import { Button, Col, Container, FormGroup, Row, Form, Alert } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import './Signup.css'
import { useLoginMutation } from '../services/appapi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [login, { error, isLoading, isError }] = useLoginMutation();
  const [loggedin ,setlog] = useState(false);
  const navigate = useNavigate();
  async function handlelogin(e) {
    e.preventDefault();
    const data = await login({ Email:email, password }).unwrap().then((payload)=>{
      console.log(payload);
      return payload;
    });
    const token =  data.token;
    localStorage.setItem('authorization', token);
    // document.cookie = `authorization=${token}` 
    console.log(token)
    setemail("");
    setpassword("");
    setlog(true);
    if (!isLoading) {
      navigate('/');
    }
  }
  return (
    <Container >
      { loggedin ? navigate("/") :<Row className='box'>
        <Col md={6} className='login_container'>
          {isError && <Alert variant='danger'>{error.data}</Alert>}
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
              <Button type='sumbit' disabled={isLoading} >LOGIN</Button>
            </FormGroup>
          </Form>
          <p>Don't have ACCOUNT ? <Link to="/Signup">Create New Account </Link></p>
        </Col>
        <Col md={6} className='login_image_container'></Col>
      </Row>}
    </Container>
  )
}

export default Login