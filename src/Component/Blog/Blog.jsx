import { Container, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogManipulateReq } from "../../functions";
import { baseUrl } from "../../index";
const Blog = ({index}) => {
    const [blog,setBlog] = useState(null);
    const params = useParams();
        useEffect(() => {
            let listNo;
            if(index === 0 || index === 1 || index === 4 || index === 7)
                listNo = 1;
            else if(index === 2 || index === 5 || index === 8)
                listNo = 2;
            else if(index === 3 || index === 6  || index === 9)
                listNo = 3;
            const url = `${baseUrl}/blog/?listNo=${listNo}&id=${params.id}`;
            fetch(url).then(res => {
                return res.json();
            }).then(data => {
                setBlog(data);
            });
         },[params.id,index]);
    const handleClick = (reqType) => {
        let listNo;
            if(index === 0 || index === 2 || index === 5 || index === 8)
                listNo = 1;
            else if(index === 3 || index === 6 || index === 9)
                listNo = 2;
            else if(index === 4 || index === 7  || index === 10)
                listNo = 3;
        blogManipulateReq(reqType,params.id,listNo);
    }
    return (   

        <Container fixed >
                {blog && 
                <Paper elevation={4} sx={{margin: '0.5rem',padding: '0.5rem'}}>
                    <Stack spacing={0.5} padding={2}>
                        <Typography variant="h3"  sx={{
                            textAlign: 'center',wordWrap: 'break-word'
                        }}>
                            {blog.title}
                        </Typography>
                        <Typography variant="body1" sx={ { wordWrap: 'break-word',textAlign: 'justify'} }  color='text.secondary'>
                            <b>Subject&nbsp;</b>:&nbsp;{blog.subject}
                        </Typography>          
                    </Stack>
                    {blog.contents.map((content,index) => (
                        <Stack key={index} spacing={0.5} my={1} padding={2}>
                            <Typography variant="h4">
                                {content.heading}
                            </Typography>
                            <Typography variant="p" fontSize='large' textAlign='justify'>
                                {content.para}
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia possimus assumenda dolorum natus quasi reprehenderit, dignissimos laudantium repellendus! Suscipit nostrum possimus vitae itaque ducimus eligendi minus deleniti vel quaerat. Neque.
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia possimus assumenda dolorum natus quasi reprehenderit, dignissimos laudantium repellendus! Suscipit nostrum possimus vitae itaque ducimus eligendi minus deleniti vel quaerat. Neque.
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia possimus assumenda dolorum natus quasi reprehenderit, dignissimos laudantium repellendus! Suscipit nostrum possimus vitae itaque ducimus eligendi minus deleniti vel quaerat. Neque.
                            </Typography>
                        </Stack>                    
                    ))}
                </Paper>
                }            
            </Container>
     );
}
 
export default Blog;