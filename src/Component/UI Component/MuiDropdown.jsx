import { Menu } from "@mui/material";
import { connect } from "react-redux";
import React from "react";
const MuiDropdown = ({menuId,anchorEl,handleClose,ariaLabledBy,children}) => {
    
    return ( 
        <Menu
            id={menuId}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": ariaLabledBy
            }}
        >
            {children}
            
        </Menu>
     );
}
 
 
const mapSTateToProps = (state) => {
    return {
        isAdmin: state.isAdmin
    }
}
export default connect(mapSTateToProps)(MuiDropdown);
