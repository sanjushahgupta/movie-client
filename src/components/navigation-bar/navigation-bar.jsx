import { Navbar, Nav, Image, Container, Button } from "react-bootstrap"

import logo from "../../css/logo.png"

export const NavigationBar = ({ user, onLoggedOut }) => {
    if (user !== null) {
        return (
            <>
                {user && (
                    < Navbar bg="black" p-3 data-bs-theme="dark">
                        <Navbar.Brand href="##"><img src={logo} alt="Logo" height={20} className="text-white m-2" />
                        </Navbar.Brand>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link className="text-white fontsize" href="/">Movies</Nav.Link>
                                    <Nav.Link className="text-white fontsize" href="/profile">Profile</Nav.Link>

                                </Nav>

                                <Nav.Item className="ml-auto">
                                    <Button className="float-right  border-none text-white" variant="danger " size="sm" onClick={onLoggedOut}> Logout</Button>
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
                        <Navbar.Brand href="#"><Image src={logo} alt="Logo" height={20} style={{ color: "white", marginLeft: "8px" }} /></Navbar.Brand>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link style={{ color: "white", fontSize: "18px" }} href="/register">Register</Nav.Link>
                                    <Nav.Link style={{ color: "white", fontSize: "18px" }} href="/login">Login</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar >
                )}
            </>
        )
    }
}