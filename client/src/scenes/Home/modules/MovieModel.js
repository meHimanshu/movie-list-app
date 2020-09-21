import React, { useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Select, MenuItem, Chip, Input
} from "@material-ui/core";

export default function MovieModal(props) {
    const { setOpenModal, setLoggedIn, setSelectedData, data = {} } = props;
    const { genre = []} = data;
    const [content, setContent] = useState({ ...data, genre});
    const keys = ["name", "99popularity", "director", "imdb_score"]
    const genres = ["Action", "Adventure", "Classic", "Comedy", "Romance", "Horror", "Thriller",
    "Drama","Biopic","Documentry","Animation", "Fantasy"]

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
          },
        },
      };

    const handleSubmit = async () => {
        let result = await fetch('http://localhost:7000/api/movies',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...content, "popularity": content["99popularity"],
                    isAuthenticated: true
                }),
            });
        result = await result.json()
        if (result) {
            console.log("result----------", result);
        }
        setSelectedData({});
        setOpenModal(false);
    };

    const handleChange = (event, field) => {
        console.log("data-----", field);
        setContent({
            ...content,
            [field]: event.target.value
        })
    }

    const handleClose = () => {
        setSelectedData({});
        setOpenModal(false);
    }

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                {keys.map((key) => (
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id={key}
                        label={key.toUpperCase()}
                        fullWidth
                        value={content && content[key]}
                        onChange={(event) => handleChange(event, key)}
                    />
                ))}
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={content.genre}
                    label={"genre"}
                    onChange={(event) => handleChange(event, "genre")}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => {
                        return <div >
                            {content.genre.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </div>
                    }}
                    MenuProps={MenuProps}
                >
                    {genres.map((name) => (
                        <MenuItem key={name} value={name} >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button isDisabled onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleSubmit} color="primary">
                    {content._id?"Update":"Add"}
          </Button>
            </DialogActions>
        </Dialog>
    );
}
