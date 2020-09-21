import React,{useState} from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle
} from "@material-ui/core";

export default function LoginModel(props) {
    const { setOpenModal, setLoggedIn } = props;
    const [content, setContent] = useState({})


    const handleClose = async () => {
        const {username, password} = content;
        let result = await fetch('http://localhost:7000/api/user/login',
        {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({username, password})
    });
        result = await result.json()
        if(result && result.isAuthenticated){
            localStorage.setItem("isAuthenticated","true");
            setLoggedIn(true);
        }
        setOpenModal(false);
    };

    const handleChange = (event, field) => {
        setContent({
            ...content,
            [field]: event.target.value
        })
    }

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="username"
                    label="Username"
                    fullWidth
                    value={content.username}
                    onChange={(event) => handleChange(event, "username")}
                />
                <TextField
                    required
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={content.password}
                    onChange={(event) => handleChange(event, "password")}
                />
            </DialogContent>
            <DialogActions>
                <Button isDisabled onClick={() => setOpenModal(false)} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleClose} color="primary">
                    Sign In
          </Button>
            </DialogActions>
        </Dialog>
    );
}
