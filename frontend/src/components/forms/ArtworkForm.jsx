import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const ArtworkForm = ({ fetchArtworks, artists, editingArtwork, setEditingArtwork }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistId, setArtistId] = useState("");

  useEffect(() => {
    if (editingArtwork) {
      setTitle(editingArtwork.title);
      setDescription(editingArtwork.description || "");
      setArtistId(editingArtwork.artist_id);
    }
  }, [editingArtwork]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, artist_id: parseInt(artistId) };
    if (editingArtwork) {
      await api.put(`/artworks/${editingArtwork.id}`, payload);
      setEditingArtwork(null);
    } else {
      await api.post("/artworks/", payload);
    }
    setTitle("");
    setDescription("");
    setArtistId("");
    fetchArtworks();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
      }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Artist</InputLabel>
        <Select
          value={artistId}
          onChange={(e) => setArtistId(e.target.value)}
          required
        >
          {artists.map((artist) => (
            <MenuItem key={artist.id} value={artist.id}>{artist.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="secondary">
        {editingArtwork ? "Update" : "Add"} Artwork
      </Button>
    </Box>
  );
};

export default ArtworkForm;
