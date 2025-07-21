import {Link} from "react-router"
import  plus from '../../public/plus.png'

const NavBar = () =>{
    return(
    <header className="nav">
        <h1>NOTES</h1>
        <Link to="/create"><img src={plus}/></Link>
    </header>
    )
}

export default NavBar