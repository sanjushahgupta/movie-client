import { Navbar, Nav, Image, Container, Button } from "react-bootstrap"
import logo from "../../css/logo.png"
import { size } from "lodash"
import { SearchBar } from "../search-bar/searchbar"

export const NavigationBar = ({ user, onLoggedOut, setMovies, movies }) => {

    if (user !== null) {
        return (
            <>
                {user && (
                    < Navbar bg="black" data-bs-theme="dark">
                        <Navbar.Brand href="##"><Image src={logo} alt="logoImg" height={45} style={{ color: "white", marginLeft: "8px" }} /></Navbar.Brand>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link style={{ color: "white", fontSize: "18px" }} href="/">Movies</Nav.Link>
                                    <Nav.Link style={{ color: "white", fontSize: "18px" }} href="/profile">Profile</Nav.Link>
                                    {movies.length > 1 &&
                                        < SearchBar setMovies={setMovies} ></SearchBar>}

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