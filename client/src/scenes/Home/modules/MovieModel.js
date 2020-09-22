import React, { useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, Box,
    Select, MenuItem, Chip, Input, InputLabel
} from "@material-ui/core";

export default function MovieModal(props) {
    const { setOpenModal, fetchData, setSelectedData, data = {} } = props;
    const { genre = [] } = data;
    const [content, setContent] = useState({ ...data, genre });
    const keys = ["name", "99popularity", "director", "imdb_score"]
    const genres = ["Action", "Adventure", "Classic", "Comedy", "Romance", "Horror", "Thriller",
        "Drama", "Biopic", "Documentry", "Animation", "Fantasy"]

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    };

    const handleSubmit = async () => {
        const isUpdate = content._id
        const path = isUpdate ? `${content._id}` : '';
        setSelectedData({});
        setOpenModal(false);
        fetchData({
            method: isUpdate ? "PUT":"POST",
            url: `https://movaistapp.herokuapp.com/api/movies/${path}`,
            body: {
                ...content, "popularity": content["99popularity"]
            },
            refetch:true
        })
    };

    const handleChange = (event, field) => {
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
                        disabled={key === "name" && data[key]}
                        required
                        margin="dense"
                        id={key}
                        label={key.toUpperCase()}
                        fullWidth
                        value={content && content[key]}
                        onChange={(event) => handleChange(event, key)}
                    />
                ))}
                <Box mt={1}>
                    <InputLabel id="demo-mutiple-chip-label">Genre</InputLabel>
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
                </Box>
            </DialogContent>
            <DialogActions>
                <Button isDisabled onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleSubmit} color="primary">
                    {content._id ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
