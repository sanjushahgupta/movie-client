import { Navbar, Nav, Image, Container, Button } from "react-bootstrap"
import logo from "../../css/logo.png"
import { Link } from 'react-router-dom'

export const NavigationBar = ({ user, onLoggedOut }) => {

    if (user !== null) {
        return (
            <>
                {user && (
                    < Navbar bg="black" data-bs-theme="dark">
                        <Navbar.Brand href="#"><Image src={logo} height={45} style={{ color: "white", marginLeft: "8px" }} /></Navbar.Brand>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link style={{ color: "white" }} href="/">Movies</Nav.Link>

                                    <Nav.Link style={{ color: "white" }} href="/profile">Profile</Nav.Link>
                                </Nav>
                                <Nav.Item className="ml-auto">
                                    <Button className="float-right" style={{ background: "gray", border: 'none' }} size="sm" onClick={onLoggedOut}> Logout</Button>
                                </Nav.Item>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar >
                )}
            </>
        )
    } else {
        return (
            <>
                {!user && (
                    < Navbar bg="black" data-bs-theme="dark">
                        <Navbar.Brand href="#"><Image src={logo} height={45} style={{ color: "white", marginLeft: "8px" }} /></Navbar.Brand>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link style={{ color: "white" }} href="/register">Register</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/login">Login</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar >
                )}
            </>
        )
    }
}