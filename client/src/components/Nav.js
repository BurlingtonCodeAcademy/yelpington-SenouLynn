import { Link } from "react-router-dom";


function Nav(props) {
    return (
        <div id="nav" >
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/restaurant/henrys-diner">Henry's Diner</Link>
            <Link className="nav-link" to="/restaurant/halvorsons">Halvorson's</Link>
            <Link className="nav-link" to="/restaurant/hen-of-the-wood">Hen of the Woods</Link>
            <Link className="nav-link" to="/restaurant/new-moon">New Moon</Link>
            <Link className="nav-link" to="/restaurant/american-flatbread">American Flatbread</Link>
            <Link className="nav-link" to="/restaurant/the-skinny-pancake">The Skinny Pancake</Link>
            <Link className="nav-link" to="/restaurant/nectars">Nectar's</Link>
            <Link className="nav-link" to="/restaurant/ben-and-jerrys">Ben n' Jerry's</Link>
            <Link className="nav-link highlight" to="/review">Review A Restaurant</Link>
        </div>
    )
}

export default Nav