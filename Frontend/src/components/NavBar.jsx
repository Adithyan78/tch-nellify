import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import './NavBar.css';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleDrawerClose();
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Books', path: '/Books' },
    { text: 'Programs', path: '/Programs' },
    { text: 'Notes', path: '/Notes' },
  ];

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1201 }}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          )}
          <img src={logo} alt="TechCodeHub Logo" className="logo" style={{ height: '40px', marginRight: '16px' }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TechCodeHub
          </Typography>
          {!isMobile && (
            <div className="menuItems">
              {menuItems.map((item) => (
                <Button 
                  key={item.text}
                  color="inherit"
                  component={Link} 
                  to={item.path}
                  sx={{
                    borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Button 
                color="primary" 
                component={Link} 
                to="/signin" 
                sx={{ 
                  backgroundColor: 'white', 
                  color: 'black', 
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.1)' 
                  }
                }}
              >
                Login
              </Button>
              {/* <Button 
                color="primary" 
                component={Link} 
                to="/signup" 
                sx={{ 
                  backgroundColor: 'white', 
                  color: 'black', 
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.1)' 
                  }
                }}
              >
                Signup
              </Button> */}
            </div>
          )}
          {isMobile && (
            <Button 
              color="primary" 
              component={Link} 
              to="/signin" 
              sx={{ 
                marginLeft: 'auto', 
                backgroundColor: 'white', 
                color: 'black', 
                '&:hover': { 
                  backgroundColor: 'rgba(0, 0, 0, 0.1)' 
                }
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: 'rgba(0,0,0,0.8)',
            top: '64px',
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              component={Link} 
              to={item.path} 
              onClick={() => handleNavigation(item.path)}
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: "white"
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {/* <ListItem 
            button 
            component={Link} 
            to="/signin" 
            onClick={handleDrawerClose} 
            sx={{ 
              color: "black", 
              backgroundColor: 'white', 
              '&:hover': { 
                backgroundColor: 'rgba(0, 0, 0, 0.1)' 
              } 
            }}
          >
            <ListItemText primary="Login" />
          </ListItem> */}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
