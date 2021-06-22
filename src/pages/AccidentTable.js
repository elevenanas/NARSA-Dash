
import React from "react";
import {useState, useEffect, useMountEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import moment from "moment-timezone";
import axios from "axios";



export const AccidentTable = () => {

  

    const [info,setInfo] =useState({});
   
    
    useEffect(() => {
      axios.get('https://roadsafeazurefuncs20210609092106.azurewebsites.net/api/GetDangerTrigger')
      .then(res => 
        setInfo(res.data))
      .catch(err =>
        console.log(err))
    },[])
    const infoList = Array.from(info);  
    const totalinfo = infoList.length;
  
  
    
    const TableRow = (props) => {
  
      const { id , liveImage, category,  time, status} = props;
      const statusVariant = status === "confirmed" ? "success"
        : status === "on hold" ? "warning"
          : status === "canceled" ? "danger" : "primary";
      return (
        
        <tr>
          <td>
            <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
              {id}
            </Card.Link>
          </td>
          <td>
            <span className="fw-normal">
            <Image width={200} height={100} src="https://images.omerlocdn.com/resize?url=https%3A%2F%2Fgcm.omerlocdn.com%2Fproduction%2Fglobal%2Ffiles%2Fimage%2F8044cf85-e665-40e7-bbc1-d46eb4d98dce.jpg&width=1024&type=webp" rounded />
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {moment(time).format('d-MMM-yyyy h:mm:ss ')}
              
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {category.name}
              {/* category.content[0].casualtyGender */}
            </span>
          </td>
          {/* <td>
            <span className="fw-normal">
              ${parseFloat(price).toFixed(2)}
              {markerIcon}
            </span>
          </td> */}
          <td>
            <span className={`fw-normal text-${statusVariant}`}>
              {status}
            </span>
          </td>
          <td>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to="/settings">
                  <FontAwesomeIcon icon={faEye}  className="me-2" /> View Details
                 </Link>
                </Dropdown.Item> 
                <Dropdown.Item>
                  <Link to="/">
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-danger">
                  <Link to="/">
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>      
        </tr>
      );
    };
  
    return (
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">id</th>
                <th className="border-bottom">Picture</th>
                <th className="border-bottom">Issue Date</th>
                {/* <th className="border-bottom">Due Date</th> */}
                <th className="border-bottom">Type</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {infoList.map(a => <TableRow key={`accident-${a.id}`} {...a} />)}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>
                  Previous
                </Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next>
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{totalinfo}</b> out of <b>100</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  };