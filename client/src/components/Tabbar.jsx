import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav } from 'react-bootstrap';


function Tabbar() {
    return (
        <Nav variant='tabs' defaultActiveKey='/search'>
            <Nav.Item>
                <Nav.Link eventKey='/search'>Explore</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='/liked'>Liked</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='/rank'>Rank</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='/settings'>Settings</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Tabbar