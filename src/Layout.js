import { Outlet, Link, useNavigate } from "react-router-dom";
import './header.css';
import { useToken } from "./TokenProvider";
import axios from "axios";
import { useEffect, useState } from "react";

const LoginMenu=(<div style={{margin:'0'}}>
     <header className="header">
    <h1>MD Forum</h1>
     <nav>
         <ul>
         <Link to="/"><li>Home</li></Link>
         <Link to="/login"><li>Login</li></Link>
         <Link to="/register"><li>Register</li></Link>
         </ul>
    </nav>
     </header>
     <Outlet/>
 </div>);

const UserMenu=(<div style={{margin:'0'}}>
<header className="header">
<h1>MD Forum</h1>
<nav>
    <ul>
    <Link to="/"><li>Home</li></Link>
    <Link to="/myposts"><li>My Posts</li></Link>
    <Link to="/post"><li>Post</li></Link>
    </ul>
</nav>
</header>
<Outlet/>
</div>);

function Layout() {
    const { token } = useToken();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
      // Make an authenticated API request using the token
      const config = {
        headers: {
          Authorization: token,
        },
      };
  
      axios.get('/api/protected-route', config)
        .then((response) => {
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          // console.error(error);
          setLoading(false);
        //   navigate('/login');
        });
    }, [token]);

    if(!token || loading)
    {
        return (
            // <div style={{margin:'0'}}>
            //     <header className="header">
            //     <h1>MD Forum</h1>
            //     <nav>
            //         <ul>
            //         <Link to="/"><li>Home</li></Link>
            //         <Link to="/login"><li>Login</li></Link>
            //         <Link to="/register"><li>Register</li></Link>
            //         </ul>
            //     </nav>
            //     </header>
            //     <Outlet/>
            // </div>
            <LoginMenu/>
        );
    }
    else
    {
      return (
          // <div style={{margin:'0'}}>
          //     <header className="header">
          //     <h1>MD Forum</h1>
          //     <nav>
          //         <ul>
          //         <Link to="/"><li>Home</li></Link>
          //         <Link to="/myposts"><li>My Posts</li></Link>
          //         <Link to="/post"><li>Post</li></Link>
          //         </ul>
          //     </nav>
          //     </header>
          //     <Outlet/>
          // </div>
          <UserMenu/>
      );
    }
  }
  
  export default Layout;