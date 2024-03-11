import React, { useContext, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import UserDetails from './UserDetails';
import { UserContext } from './UserContext';
import './CssFiles/HomePage.css'
import { Surveys } from './Surveys';
import PublishSurvey from './PublishSurvey';
const Homepage = () => {
  const {PullUserDetails,Data}=useContext(UserContext)
 useEffect(()=>{
PullUserDetails()
// eslint-disable-next-line
 },[])
  return (
    <div> <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row>
      <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="first">User Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Publish Survey</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">Surveys Managments</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={9}>
        <Tab.Content className='tab-content'>
          <Tab.Pane eventKey="first">
            <UserDetails className="user-details" data={Data}/>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <PublishSurvey/>
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            <Surveys/>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container></div>
  )
}

export default Homepage