import { Link } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import menu from "../assets/menu.png"

export default function Header(){
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    function handleHeaderReset(){
    localStorage.removeItem("data");
    localStorage.removeItem("result")
    }
    return(
    <header>
            <h1 className="title">
            Finding Falcone
            </h1>
            <nav className="larger-nav">
                <Link className="nav-link" to="/">rules</Link>
                <Link onClick={handleHeaderReset} className="nav-link" to="/game">reset</Link>
                <Link className="nav-link" to="game">game</Link>
            </nav>
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
        <MenuItem onClick={handleClose}>
        <Link className="nav-link" to="/">rules</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Link onClick={handleHeaderReset} className="nav-link" to="/game">reset</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Link className="nav-link" to="game">game</Link>
        </MenuItem>
      </Menu>
            </nav>
            </header>
        ) 
        
}

           
          



  
    