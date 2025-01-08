import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAsync } from '../../services/actions/AuthAction';

const Header = () => {

    const { user } = useSelector(state => state.AuthReducer);

    const { cart } = useSelector(state => state.ProductReducer);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLogoutAsync())
    }

    return(
        <>
            <Navbar expand="lg" className="shadow-sm bg-transparent">
                <Container>
                    
                    <Navbar.Brand href="#" className="fs-3 fw-bold" style={{ fontFamily: "'Lucida Handwriting', cursive" }}>
                    Lucille
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbar-nav" />

                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link href="#home" className="text-dark active">HOME</Nav.Link>
                            <Nav.Link href="#music" className="text-dark">MUSIC</Nav.Link>
                            <Nav.Link href="#events" className="text-dark">EVENTS</Nav.Link>
                            <Nav.Link href="#videos" className="text-dark">VIDEOS</Nav.Link>
                            <Nav.Link href="#images" className="text-dark">IMAGES</Nav.Link>
                            <Nav.Link href="#blog" className="text-dark">BLOG</Nav.Link>
                            <Link to='/shop' className="text-dark">SHOP</Link>
                            <Nav.Link href="#contact" className="text-dark">CONTACT</Nav.Link>
                        </Nav>

                        <div className="d-flex align-items-center gap-3">
                            <Link to='/cart' className="text-dark position-relative">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='#000' height='25'>
                                    <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/>
                                </svg>
                                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                    {
                                        cart.length || '0'
                                    }
                                </Badge>
                            </Link>
                            {
                                !user ? 
                                    <Link to='/signIn'>
                                        <Button className='btn1'>Sign In</Button>
                                    </Link>
                                :   <Link>
                                        <Button className='btn1' onClick={handleLogout}>Sign Out</Button>
                                    </Link>
                            }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}   
export default Header;