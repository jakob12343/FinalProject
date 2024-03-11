import React from 'react'
import { Accordion } from 'react-bootstrap'
import OwnServey from './OwnServey'
import NonActive from './NonActive'
import OtherSurveys from './OtherSurveys'

export const Surveys = () => {
  return (
    <Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
      <Accordion.Header>Your Own Surveys</Accordion.Header>
      <Accordion.Body>
       <OwnServey/>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header className='text-capitalize'>Surveys History </Accordion.Header>
      <Accordion.Body>
       <NonActive/>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
      <Accordion.Header>Other Surveys</Accordion.Header>
      <Accordion.Body>
       <OtherSurveys/>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>  )
}
