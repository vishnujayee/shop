import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
export default function NotFound() {
  return (
    <div style={{margin:'2rem'}}>
        <LinkContainer to={"/"}><Button>Go to Home</Button></LinkContainer>
    </div>
  )
}
