import { Button, Container, Grid, Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { checkForAuth } from "../../functions";
import withRouter from "../../withRouterFn";
import './userRegistration.css';
import { baseUrl } from "../..";
function MediaQuery({children}) {
    const match = useMediaQuery('(max-width: 600px)');
    return (
        <Stack spacing={2} direction={match?'column':'row'} border={'1px solid black'}>
            {children}
        </Stack>
    )
}
class UserRegistration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            occupation: "",
            age: "",
            email: "",
            password: "",
            cpassword: "",
            error: false,
            errorMsg: '',
            succuss: ''
        };
        this.registerUser = this.registerUser.bind(this);
    }
    componentDidMount() {
        checkForAuth().then((res)=> {
            if(res.status){
                if(res.isAdmin)
                    this.props.router.navigation('/admin');
                else 
                    this.props.router.navigation('/dashboard');
            }
        });
    }
    registerUser(){
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(this.state.password !== this.state.cpassword){
            this.setState({
                error: true,
                errorMsg: 'Password & Confirm Password not matched !',
                succuss: ''
            });
            return ;
        }
        else if (this.state.password.trim().length === 0){
            this.setState({
                error: true,
                errorMsg: 'Please enter valid password !',
                succuss: ''
            });
            return;
        }else if (!this.state.email.match(validRegex)){
            this.setState({
                error: true,
                errorMsg: 'Please enter valid Email Address !',
                succuss: ''
            });
            return;
        }else if(this.state.occupation.trim().length < 6){
            this.setState({
                error: true,
                errorMsg: 'Occupation must be greater than 5 characters !',
                succuss: ''
            });
            return;
        }else if(this.state.occupation.trim().length > 30){
            this.setState({
                error: true,
                errorMsg: 'Occupation must be les than 30 characters !',
                succuss: ''
            });
            return;
        }else if (this.state.age < 18) {
            this.setState({
                error: true,
                errorMsg: "Age can't be less than 18 years",
                succuss: ''
            });
            return;
        }else if (this.state.age > 80) {
            this.setState({
                error: true,
                errorMsg: "Age can't be greater than 80 years",
                succuss: ''
            });
            return;
        }else if (this.state.name.trim().length < 3){
            this.setState({
                error: true,
                errorMsg: "Name can't be less than 3 characters !",
                succuss: ''
            });
            return;
        }else if (this.state.name.trim().length > 30){
            this.setState({
                error: true,
                errorMsg: "Name can't be greater than 30 characters !",
                succuss: ''
            });
            return;
        }else {
            this.setState({
                error: false,
                errorMsg: '',
                succuss: 'Registration is in processing Please wait !'
            });
        }
        fetch(`${baseUrl}/register`,{
            method: "POST",
            body: JSON.stringify({
                name: this.state.name,
                occupation: this.state.occupation,
                age: this.state.age,
                email: this.state.email,
                password: this.state.password,
                cpassword: this.state.cpassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if(data.status) {
                setTimeout(() => {
                    this.props.router.navigation('/login');
                },2000);
                this.setState({
                    error: false,
                    errorMsg: '',
                    succuss: 'Successfully Registered ! Now Login !'
                });
            }
            else {
                if(data.error._message === "User validation failed"){
                    this.setState({
                        error: true,
                        errorMsg: 'Please Enter valid details !',
                        succuss: ''
                    });
                }else {
                    this.props.router.navigation('/');
                }
            }
        }).catch((err) => {
            console.log(err);
        });
        console.log(this.state);
    }
    render(){
    return ( 
        <Container>
            <Paper sx={{padding: 2,maxWidth: '800px', margin: '1rem auto',textAlign: 'center'}} elevation={4}>
                <Typography variant="h5" component='span' >
                    User Registration
                </Typography>
                <Grid container my={2} rowGap={2} direction={{ sm: 'row',xs: 'column' }} >
                    <Grid item sm={12} >
                        <Stack spacing={2} direction={{ sm: 'row',xs: 'column' }}>
                            <TextField 
                                variant="outlined"
                                label='Name'
                                aria-label="Name"
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value})}
                                fullWidth
                            />
                            <TextField 
                                variant="outlined"
                                label='Age'
                                aria-label="Age"
                                value={this.state.age}
                                onChange={(e) => this.setState({age: e.target.value})}
                                fullWidth
                                type='number'
                            />
                        </Stack>
                        </Grid>
                        <Grid item sm={12}>
                        <Stack spacing={2} direction={{ sm: 'row',xs: 'column' }}>
                            <TextField 
                                variant="outlined"
                                label='Occupation'
                                aria-label="occupation"
                                value={this.state.occupation}
                                onChange={(e) => this.setState({occupation: e.target.value})}
                                fullWidth
                            />
                            <TextField 
                                variant="outlined"
                                label='Email'
                                aria-label="Email"
                                value={this.state.email}
                                onChange={(e) => this.setState({email: e.target.value})}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item sm={12} >
                        <Stack spacing={2} direction={{ sm: 'row',xs: 'column' }}>
                            
                            <TextField 
                                variant="outlined"
                                label='Password'
                                aria-label="password"
                                type='password'
                                value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}
                                fullWidth
                            />
                            <TextField 
                                variant="outlined"
                                label='Confirm Password'
                                aria-label="confirm password"
                                type='password'
                                value={this.state.cpassword}
                                onChange={(e) => this.setState({cpassword: e.target.value})}
                                fullWidth
                            />
                        </Stack>               
                    </Grid>
                </Grid>
                <Stack direction='row' spacing={2} my={2} justifyContent='center'>
                    <Button variant="contained" color="primary" onClick={this.registerUser} >Sign Up</Button>
                    <Button variant="outlined" color="primary" component={Link} to="/login" >Sign In</Button>
                </Stack>
                {this.state.error && <Stack direction='row' spacing={2} my={2} justifyContent='center'>
                    <Typography color='error'>
                        {this.state.errorMsg}
                    </Typography>
                </Stack>}
                {this.state.succuss.length > 0 && <Stack direction='row' spacing={2} my={2} justifyContent='center'>
                    <Typography color='success'>
                        {this.state.succuss}
                    </Typography>
                </Stack>}
            </Paper>
            </Container>
     );
    }
}
 
export default withRouter(UserRegistration);