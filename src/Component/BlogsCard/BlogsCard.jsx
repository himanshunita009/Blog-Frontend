import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './BlogsCard.css';
const BlogsCard = ({blogId,blogTitle,blogSubject,path,approveBut,rejectBut,deleteBut,handleClick}) => {
    return ( 
            <Card elevation={4} sx={{margin: '1rem auto',width: '300px'}}>
                <CardContent>
                    <Typography variant='h4' component='div'>
                        {blogTitle}
                    </Typography>
                    <Typography variant='body1' textAlign={'justify'} color='text.secondary' sx={{wordWrap: 'break-word'}}>
                        {blogSubject}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant='outlined'
                        component={Link}
                        to={`${path}/${blogId}`}
                    >
                        Read
                    </Button>
                    {approveBut && 
                        <Button
                            variant='outlined'
                            component={Link}
                            onClick={() => handleClick(1,blogId)}
                            color='success'
                        >
                            Approve
                        </Button>
                    }
                    {rejectBut && 
                        <Button
                            variant='outlined'
                            component={Link}
                            onClick={() => handleClick(2,blogId)}
                            color='warning'
                            
                        >
                            Reject
                        </Button>
                    }
                    {deleteBut && 
                        <Button
                            variant='outlined'
                            component={Link}
                            onClick={() => handleClick(3,blogId)}
                            color='error'
                        >
                            Delete
                        </Button>
                    }
                </CardActions>
        </Card>
     );
}
 
export default BlogsCard;