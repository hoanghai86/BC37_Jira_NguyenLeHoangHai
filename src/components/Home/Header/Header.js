import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

export default function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="bg-dark navbar-dark">
        <Container fluid>
          <Navbar.Brand href="#">CyberLearn</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-between">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
