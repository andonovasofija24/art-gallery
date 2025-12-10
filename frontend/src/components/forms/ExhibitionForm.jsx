import React, { useEffect, useState } from "react";
import { api } from "../../api";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";

const ExhibitionForm = ({ fetchExhibitions, artists, artworks, editingExhibition, setEditingExhibition }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);

  useEffect(() => {
    if (editingExhibition) {
      setTitle(editingExhibition.title);
      setLocation(editingExhibition.location || "");
      setSelectedArtists(editingExhibition.artists.map(a => a.id));
      setSelectedArtworks(editingExhibition.artworks.map(a => a.id));
    }
  }, [editingExhibition]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      location,
      artist_ids: selectedArtists.map(Number),
      artwork_ids: selectedArtworks.map(Number),
    };
    if (editingExhibition) {
      await api.put(`/exhibitions/${editingExhibition.id}`, payload);
      setEditingExhibition(null);
    } else {
      await api.post("/exhibitions/", payload);
    }
    setTitle("");
    setLocation("");
    setSelectedArtists([]);
    setSelectedArtworks([]);
    fetchExhibitions();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: "wrap",
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
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
      />

      <FormControl sx={{ minWidth: 150, maxWidth: 250 }}>
        <InputLabel>Artists</InputLabel>
        <Select
          multiple
          value={selectedArtists}
          onChange={(e) => setSelectedArtists(e.target.value)}
          input={<OutlinedInput label="Artists" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((id) => {
                const artist = artists.find((a) => a.id === id);
                return <Chip key={id} label={artist?.name} size="small" />;
              })}
            </Box>
          )}
        >
          {artists.map((artist) => (
            <MenuItem key={artist.id} value={artist.id}>
              {artist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150, maxWidth: 250 }}>
        <InputLabel>Artworks</InputLabel>
        <Select
          multiple
          value={selectedArtworks}
          onChange={(e) => setSelectedArtworks(e.target.value)}
          input={<OutlinedInput label="Artworks" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((id) => {
                const art = artworks.find((a) => a.id === id);
                return <Chip key={id} label={art?.title} size="small" />;
              })}
            </Box>
          )}
        >
          {artworks.map((art) => (
            <MenuItem key={art.id} value={art.id}>
              {art.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="success" sx={{ height: "fit-content" }}>
        {editingExhibition ? "Update" : "Add"} Exhibition
      </Button>
    </Box>
  );
};

export default ExhibitionForm;
