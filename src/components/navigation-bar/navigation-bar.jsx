import { Navbar, Nav, Image, Container, Button } from "react-bootstrap"
import cover from "../../css/cover.png"
// 

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <>
            {user && (
                < Navbar bg="black" data-bs-theme="dark">
                    <Navbar.Brand href="#"><Image className="m-1" src={cover} height={50} /></Navbar.Brand>
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link style={{ color: "white" }} href="/movies">Movies</Nav.Link>
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
}