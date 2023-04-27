import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const MuiDialog = ({dialogState,title,dialogContetText,children}) => {
    return ( 
        <Dialog open={dialogState}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText color='green'>
                    {dialogContetText}
                </DialogContentText>    
            </DialogContent> 
            <DialogActions>
                {children}
            </DialogActions>
        </Dialog>
     );
}
 
export default MuiDialog;