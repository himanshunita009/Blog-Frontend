import './Header.css';
import { connect } from "react-redux";
import { checkForAuth } from '../../functions';
import { AppBar, IconButton, Toolbar, Typography ,MenuItem, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import Person from '@mui/icons-material/Person';
import MuiDrawer from '../UI Component/Drawer/MuiDrawer';
import MuiDropdown from '../UI Component/MuiDropdown';
import { useState } from 'react';
import { baseUrl } from '../../index';
const Header = (props) => {
    const [anchorEl,setAnchorEl] = useState(null);
    const query =  useMediaQuery('(max-width: 650px)');
    const navigate = useNavigate();
    if(!props.authState)
        checkForAuth();
    const signOut = async () => {
        await fetch(`${baseUrl}/logout`,{mode: 'cors',credentials: 'include'}).then(() => {
            navigate('/login');
        console.log(document.cookie);
        });
        setAnchorEl(null);

    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
            <AppBar position='sticky'>
                <Toolbar >
                    {props.authState &&
                        <>
                            <div className="menu-button">
                            <IconButton color='inherit' onClick={() => props.setMenuState(!props.menuState)} >
                                <MenuIcon  />
                            </IconButton>
                            </div>
                            <MuiDrawer 
                                menuState={props.menuState} 
                                toggleMenuState={() => props.setMenuState(!props.menuState)}  
                                anchor= {query?'bottom':'left'}
                            />
                        </>
                    }
                    <Typography variant='h6' component={Link} to='/' color='inherit' sx={{ flexGrow: 1}}>
                        BLOGGERS.COM
                    </Typography>
                    <Stack direction='row' spacing={2} >
                        <IconButton color='inherit' onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <Person id='user-button'  />
                        </IconButton>
                        
                            {props.authState &&
                                <MuiDropdown menuId='user-menu' anchorEl={anchorEl} handleClose={handleClose} ariaLabledBy='user-button' >
                                <MenuItem onClick={handleClose} component={Link} to={`/${props.isAdmin?'admin':'dashboard'}`}>Dashboard</MenuItem>
                                <MenuItem onClick={signOut}>Sign Out</MenuItem>
                                </MuiDropdown>   
                            }
                            {!props.authState &&
                                <MuiDropdown menuId='user-menu' anchorEl={anchorEl} handleClose={handleClose} ariaLabledBy='user-button' >
                                <MenuItem onClick={handleClose} component={Link} to='/login'>Sign In</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to='/registration'>Sign Up</MenuItem>
                                </MuiDropdown>
                            }

                    </Stack>
                </Toolbar>
                
            </AppBar>
    );
}


const mapStateToProps = (state) => {
    return {
        authState: state.authState,
        menuState: state.menuState,
        isAdmin: state.isAdmin
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        setMenuState: (menuState) => {dispatch({type: 'SET_MENU_STATE',menuState: menuState})}
    }
}
export default connect(mapStateToProps,mapDispatchToPorps)(Header);