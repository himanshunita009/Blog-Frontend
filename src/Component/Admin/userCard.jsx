import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
class UserCard extends React.Component {
    render(){
        return (
            <Card elevation={4}>
                <CardContent>
                    <Typography variant="h5" component='div'>
                        {this.props.user.name}
                    </Typography>
                    <Typography variant="h6" component='div'>
                        {this.props.user.email}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack sx={{direction: 'column' ,alignItems: 'start',width: '100%'}}>
                        <Stack direction='row' sx={{justifyContent: 'flex-start',alignItems: 'baseline'}}> 
                            <Button component={Link} to={`/admin/${this.props.user.email}/approvedBlogs`} onClick={() => {this.props.loadData(1,this.props.user.email)}}>Approved Blogs</Button> 
                            <Typography> - {this.props.user.contribution === 0 ? 0 :this.props.user.contribution.approved} </Typography>
                        </Stack>
                        <Stack direction='row' sx={{justifyContent: 'flex-start',alignItems: 'baseline',width: '100%'}}> 
                            <Button component={Link} to={`/admin/${this.props.user.email}/pendingBlogs`} onClick={() => {this.props.loadData(1,this.props.user.email)}}>Pending Blogs</Button> 
                            <Typography> - {this.props.user.contribution === 0 ? 0 :this.props.user.contribution.pending} </Typography>
                        </Stack>
                        <Stack direction='row' sx={{justifyContent: 'flex-start',alignItems: 'baseline'}}> 
                            <Button component={Link} to={`/admin/${this.props.user.email}/rejectedBlogs`} onClick={() => {this.props.loadData(1,this.props.user.email)}}>Rejected Blogs</Button> 
                            <Typography> - {this.props.user.contribution === 0 ? 0 :this.props.user.contribution.rejected} </Typography>
                        </Stack>
                        
                    </Stack>
                </CardActions>
            </Card>
        );
    }
};


export default UserCard;
