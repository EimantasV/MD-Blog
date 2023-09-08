import { Outlet, Link } from "react-router-dom";
import './header.css';
function Layout() {
    return (
        <div style={{margin:'0'}}>
            <header className="header">
            <h1>MD Forum</h1>
            <nav>
                <ul>
                <Link to="/"><li>Home</li></Link>
                <Link to="/post"><li>Post</li></Link>
                </ul>
            </nav>
            </header>
            <Outlet/>
        </div>
    );
  }
  
  export default Layout;