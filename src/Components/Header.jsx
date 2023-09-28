import { Link } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import menu from "../assets/menu.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header(){
 const [anchorEl, setAnchorEl] = React.useState(null);
 const location = useLocation();
 const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    function handleHeaderReset(){  
    localStorage.removeItem("data");
    localStorage.removeItem("result");
    location.pathname === "/game" ? window.location.reload() :  navigate("/game")
   
    }
    
    return(
    <header>
            <h1 className="title">
            Finding Falcone
            </h1>
                {location.pathname === "/" ?
                <nav className="larger-nav">
                 <Link onClick={handleHeaderReset} className="nav-link play-now" to="game">Play Now</Link>
                 </nav>
                 :
                 <nav className="larger-nav">
                 <Link className="nav-link" to="/">Rules</Link>
                <Link onClick={handleHeaderReset} className="nav-link" to="/game">Reset</Link>
                </nav>
                }
            <nav className="smaller-nav">
            <Button
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
            <img width={"30px"} src={menu} alt="Icon by ariefstudio<"/>
            </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
          {location.pathname === "/" ?
          <MenuItem onClick={handleClose}>
          <Link onClick={handleHeaderReset} className="nav-link" to="game">Play Now</Link>
          </MenuItem>
        :
        <>
        <MenuItem onClick={handleClose}>
        <Link onClick={handleHeaderReset} className="nav-link" to="/game">Reset</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Link className="nav-link" to="/">Rules</Link>
        </MenuItem>
        </>
        }
      </Menu>
            </nav>
            </header>
        ) 
        
}

           
          



  
    