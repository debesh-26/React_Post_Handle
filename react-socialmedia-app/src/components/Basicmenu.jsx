import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function BasicMenu() {
  const { user } = React.useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = ()=>{
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace("/login")
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {
          <img
            src={
              user.profilePicture
                ? PF + `person/${user.profilePicture}`
                : PF + "person/noAvtar.png"
            }
            alt=""
            className="topbarImg"
          />
        }
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={`/profile/${user.username}`} style={{ textDecoration: "none",color:"black" }}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={() =>{handleClose() ;handleLogout();}} style={{color:"black"}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
