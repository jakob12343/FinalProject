import React from 'react'
import { Accordion } from 'react-bootstrap'
import OwnServey from './OwnServey'
import NonActive from './NonActive'
import OtherSurveys from './OtherSurveys'
import './CssFiles/Surveys.css'
export const Surveys = () => {
  return (
   <Accordion defaultActiveKey="0" className="surveys-accordion">
      <Accordion.Item eventKey="0" className="accordion-item">
        <Accordion.Header>Your Own Surveys</Accordion.Header>
        <Accordion.Body className="accordion-body">
          <OwnServey />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="accordion-item">
        <Accordion.Header className="text-capitalize">Surveys History</Accordion.Header>
        <Accordion.Body className="accordion-body">
          <NonActive />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className="accordion-item">
        <Accordion.Header>Other Surveys</Accordion.Header>
        <Accordion.Body className="accordion-body">
          <OtherSurveys />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>  )
}
