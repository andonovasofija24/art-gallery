import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { Box, Button, TextField } from "@mui/material";

const ArtistForm = ({ fetchArtists, editingArtist, setEditingArtist }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (editingArtist) {
      setName(editingArtist.name);
      setBio(editingArtist.bio || "");
    }
  }, [editingArtist]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingArtist) {
      await api.put(`/artists/${editingArtist.id}`, { name, bio });
      setEditingArtist(null);
    } else {
      await api.post("/artists/", { name, bio });
    }
    setName("");
    setBio("");
    fetchArtists();
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
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="secondary">
        {editingArtist ? "Update" : "Add"} Artist
      </Button>
    </Box>
  );
};

export default ArtistForm;
