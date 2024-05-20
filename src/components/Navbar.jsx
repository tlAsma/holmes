import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { Logout, Profile } from "./Icons";

export default function Navbar() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    if (Cookies.get("auth")) return true;
    else return false;
  });
  const [userEmail, setUserEmail] = useState(() => {
    if (Cookies.get("auth")) return Cookies.get("auth");
    else return "";
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (document.getElementById("heroBG")) document.getElementById("heroBG").style.width = "calc(100% - 17px)";
  };
  const handleClose = () => {
    setAnchorEl(null);
    if (document.getElementById("heroBG")) document.getElementById("heroBG").style.width = "100%";
  };

  return (
    <section className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="../images/Home/logo.png" alt="Logo" />
        <p>Holmes</p>
      </div>
      <div className="nav-btns">
        <a href="/">
          <p>Home</p>
        </a>
        <p>About</p>
        <p>Location</p>
        <a href="/contact-us">
          <p>Contact</p>
        </a>
      </div>
      {isUserLoggedIn ? (
        <div className="account-btns" style={{ gap: "0.5rem" }}>
          <p>Jamir Alam</p>
          <IconButton onClick={handleClick} size="small">
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(`/profile?email=${userEmail}`);
              }}
            >
              <Profile className="nav-menu-icons" />
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                Cookies.remove("auth");
                setIsUserLoggedIn(false);
                setUserEmail("");
              }}
            >
              <Logout className="nav-menu-icons" />
              Logout
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="account-btns">
          <a href="/login">
            <button className="btn secondary-btn">Login</button>
          </a>
          <a href="/signup">
            <button className="btn">Sign up</button>
          </a>
        </div>
      )}
    </section>
  );
}
