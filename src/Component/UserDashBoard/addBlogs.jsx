import React from 'react';
import './addBlogs.css';
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { Stack } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MuiDialog from '../UI Component/Dialog/MuiDialog';
import { Link } from "react-router-dom";
import { getBlogsList } from '../BlogList/getBlogsListFetch';
import { baseUrl } from '../..';
class AddBlogs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contents: [{heading: "",para: ""}],
            title: "",
            subject: "" ,
            error: "",
            success: ""
        }
        this.addInput = this.addInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    addInput(){
        let data = this.state.contents;
        data.push({heading: "",para: ""});
        this.setState({
            contents: data
        });
    }
    handleSubmit() {
        let blogData = {
            title: this.state.title.trim(),
            subject: this.state.subject.trim(),
            contents: this.state.contents.filter((val) => {let data = { heading: val.heading.trim(),para: val.para.trim() } ; return data;})
        }
        if(blogData.title.length < 10){
            this.setState({
                success: '',
                error: 'Title sould be at least 10 characters long !'
            });
            return;
        }else if (blogData.subject.length < 50){
            this.setState({
                success: '',
                error: 'Subject sould be at least 50 characters long !'
            });
            return;
        }
        fetch(`${baseUrl}/addBlogsData`,{
            mode: "cors",credentials: 'include',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blogData)
        }).then((res) =>{
            return res.json();
        }).then(async (status) => {
            if(!status){
                this.setState({
                    success: '',
                    error: 'Please Enter valid data !'
                });
                return;
            }else {
                this.setState({
                    success: 'Your Blog is sent to approval athorities.It will be updated within next 24 hours.',
                    error: ''
                });
                await getBlogsList(2,this.props.email,0);
                return;
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    render(){
        return (
        <Container >
            <Paper elevation={4} sx={{margin: '1rem auto',maxWidth: '800px',padding: 2}}>
                <Grid container rowGap={2} direction={{xs: 'column',sm:'row'}}>
                    <Grid item sm={12}>
                        <Stack direction={{xs: 'column',sm:'row'}} spacing={2} >
                            <TextField 
                                label="Title"
                                fullWidth
                                value={this.state.title}
                                onChange={(e) => this.setState({title: e.target.value})}
                            />
                            <TextField 
                                label="Subject"
                                fullWidth
                                value={this.state.subject}
                                onChange={(e) => this.setState({subject: e.target.value})}
                            />
                        </Stack>
                    </Grid>
                    {this.state.contents.map((content,index) => (
                        <Grid item sm={12} key={index} sx={{
                            border: '1px solid gray',
                            borderRadius: '0.5rem',
                            padding: '0.5rem'
                        }}>
                            <Stack direction='column' spacing={1} alignItems='center'>
                                <TextField 
                                   label={`Heading ${index+1}`}
                                    fullWidth
                                    value={content.heading}
                                    onChange={(e) => {
                                        let data = this.state.contents;
                                        data[index].heading = e.target.value;
                                        this.setState({
                                            contents: data
                                        });
                                    }}
                                />
                                <TextField 
                                    label={`Paragraph ${index+1}`}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={content.para}
                                    onChange={(e) => {
                                        let data = this.state.contents;
                                        data[index].para = e.target.value;
                                        this.setState({
                                            contents: data
                                        });
                                    }}
                                />
                            <Stack direction='row' justifyContent='center' spacing={2}>
                                {index === this.state.contents.length-1 && <Button variant='contained' color='success' onClick={this.addInput} >
                                    <AddIcon />
                                </Button>}
                                <Button variant='contained' sx={{width: 'fit-content'}}
                                    color='error'
                                    onClick={() => {
                                        if(this.state.contents.length > 1){
                                            let data = this.state.contents.filter(({},ind) => ind !== index);
                                            this.setState({
                                                contents: data
                                            });
                                        }else {
                                            console.log('at least 1');
                                        }
                                    }}>          
                                    <RemoveIcon />
                                </Button>
                            </Stack>
    
                        </Stack>
                        
                    </Grid>
                    ))}
                    <Grid item sm={12}>
                        <Stack direction='row' justifyContent='center' spacing={2}>
                            <Button variant='contained' color='primary' onClick={this.handleSubmit} >
                                Submit
                            </Button>
                            <Button variant='outlined' color='primary' >
                                Reset
                            </Button>

                        </Stack>
                    </Grid>
                    {this.state.error && <Grid item sm={12}>
                        <Typography color='error'>
                            {this.state.error}
                        </Typography>
                    </Grid>}
                    {this.state.success &&
                        <MuiDialog dialogState={this.state.success.length !== 0?true:false} dialogContetText={this.state.success}>
                            <Button 
                                variant='contained'
                                component={Link}
                                to={'/dashboard'}
                                onClick={() => this.setState({
                                    success: ''
                                })}
                            > OK </Button>
                        </MuiDialog>}
                </Grid>
          </Paper>
          </Container>
        );
    }
}

 
export default AddBlogs;