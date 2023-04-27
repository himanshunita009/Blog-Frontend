import React from "react";
import {checkForAuth,login } from "../../functions";
import './userLogin.css'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {  TextField, Stack, Typography , Grid, Paper, Button, Container} from "@mui/material";
import { Link } from "react-router-dom";
import withRouter from "../../withRouterFn";
class UserLogin extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            email: "",
            password: "",
            error: false,
            errorMsg: ''
        };
        this.loginUser = this.loginUser.bind(this);
    }
    componentDidMount(){
        checkForAuth().then((res) => {
            console.log(res);
            if(res.status){
                if(res.isAdmin)
                    this.props.router.navigation('/admin');
                else 
                    this.props.router.navigation('/dashboard');
            }
        });
    }
    loginUser() {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!this.state.email.match(validRegex)){
            this.setState({
                error: true,
                errorMsg: 'Please Enter valid Email Id'
            });
            return;
        }
        else if(this.state.password.trim().length === 0){
            this.setState({
                error: true,
                errorMsg: 'Password is required'
            });
            return;
        }else if(this.state.error){
            this.setState({
                error: false,
                errorMsg: ''
            });
        }
        login(this.state.email,this.state.password).then((data) => {
            if(data.status){
                if(data.isAdmin)
                    this.props.router.navigation('/admin');
                else 
                    this.props.router.navigation('/dashboard');            
            }else {
                this.setState({
                    error: true,
                    errorMsg: data.message
                }); 
            }
            console.log(this.state);
        });
    }
    render() {
        return (
                <Container fixed>
                    <Paper elevation={4} sx={{ maxWidth: '400px',margin: 'auto' }} >
                    <Grid container sx={{padding: '1rem'}}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" component='div'>
                                Sign In
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack my={2} spacing={1}>
                                <Stack direction='row' alignItems='center' spacing={1}> 
                                    <PersonIcon />
                                    <TextField 
                                        label='Email Id' 
                                        aria-label="Email Id" 
                                        variant="outlined" 
                                        sx={{flexGrow: 1}}
                                        value={this.state.email} 
                                        onChange={(e) => this.setState({email: e.target.value})} 
                                    />
                                </Stack>
                                <Stack direction='row' alignItems='center' spacing={1}> 
                                    <LockIcon />
                                    <TextField label='Password' variant="outlined" aria-label="Password" type='password' sx={{flexGrow: 1}}
                                        value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}
                                    />
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction='row' spacing={2} my={2} justifyContent='center'>
                                <Button color="primary" variant="contained" onClick={this.loginUser} >Sign In</Button>
                                <Button color="primary" variant="outlined" component={Link} to="/registration">Sign Up</Button>
                            </Stack>
                        </Grid>
                        {this.state.error && <Grid item xs={12}>
                            <Stack direction='row' spacing={2} my={2} justifyContent='center'>
                                <Typography color='error' fontSize='medium'>
                                    {this.state.errorMsg}    
                                </Typography>                                
                            </Stack>
                        </Grid>}

                    </Grid>
                    </Paper>
                </Container>

        );
    }
}


export default withRouter(UserLogin);