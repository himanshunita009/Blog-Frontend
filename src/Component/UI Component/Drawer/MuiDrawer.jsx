import { Button, Drawer, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon  from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MuiDrawer = (props) => {
    const userPanel = [
        {
            icon: DashboardIcon,
            name: "Dashboard",
            link: '/dashboard'
        },{ 
            icon: PostAddIcon,
            name: "Add New Blogs",
            link: '/dashboard/addBlogs'
        },{
            icon: VerifiedUserIcon,
            name: "Approved Blogs",
            link: '/dashboard/approvedBlogs'
        },{
            icon: PendingActionsIcon,
            name: "Pending Blogs",
            link: '/dashboard/pendingBlogs'
        },{
            icon: DeleteIcon,
            name: "Rejected Blogs",
            link: '/dashboard/rejectedBlogs'
        }
    ];
    const adminPanel = [
    {
        icon: SecurityIcon,
        name: "Admin",
        link: '/admin'
    },{
        icon: PeopleIcon,
        name: "All Users",
        link: '/admin/users'
    },{
        icon: VerifiedUserIcon,
        name: "Approved Blogs",
        link: '/admin/approvedBlogs'
    },{
        icon: PendingActionsIcon,
        name: "Pending Blogs",
        link: '/admin/pendingBlogs'
    },{
        icon: DeleteIcon,
        name: "Rejected Blogs",
        link: '/admin/rejectedBlogs'
    }
];
    return ( 
        <Drawer anchor={props.anchor} open={props.menuState} onClose={props.toggleMenuState} color='inherit' >
            <Stack sx={{padding: 2}}>
                <Stack>
                    <Typography >
                        Welcome User
                    </Typography>
                </Stack>
                <Stack spacing={2}>
                    {!props.isAdmin && userPanel.map((item,index) => (
                        <Button
                            key={index}
                            startIcon={<item.icon />}
                            sx={{padding: '0.5rem 1rem',justifyContent: 'flex-start'}}
                            component={Link}
                            to={item.link}
                            variant='contained'
                            onClick={props.toggleMenuState}
                        >   
                            {item.name}
                        </Button>
                    ))
                    }
                    {props.isAdmin && adminPanel.map((item,index) => (
                        <Button
                            key={index}
                            startIcon={<item.icon />}
                            sx={{padding: '0.5rem 1rem',justifyContent: 'flex-start'}}
                            component={Link}
                            to={item.link}
                            variant='contained'
                            onClick={props.toggleMenuState}
                        >   
                            {item.name}
                        </Button>
                    ))
                    }
                </Stack>
            </Stack>
        </Drawer>
     );
}
 
const mapSTateToProps = (state) => {
    return {
        isAdmin: state.isAdmin
    }
}

export default connect(mapSTateToProps)(MuiDrawer);