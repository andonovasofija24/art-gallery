import React, { useEffect, useState } from "react";
import { api } from "../api";
import ArtistForm from "./forms/ArtistForm";
import { Trash2, Edit2 } from "lucide-react";
import { Box, Card, CardContent, Typography, IconButton, Grid } from "@mui/material";

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [editingArtist, setEditingArtist] = useState(null);

  const fetchArtists = async () => {
    try {
      const res = await api.get("/artists/");
      setArtists(res.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/artists/${id}`);
      fetchArtists();
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  const handleEdit = (artist) => setEditingArtist(artist);

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2, color: "#6a1b9a" }}>
        Artists
      </Typography>

      <Box sx={{ marginBottom: 3, background: "#f3e5f5", padding: 2, borderRadius: 2 }}>
        <ArtistForm
          fetchArtists={fetchArtists}
          editingArtist={editingArtist}
          setEditingArtist={setEditingArtist}
        />
      </Box>

      <Grid container spacing={3}>
        {artists.map((artist) => (
          <Grid item xs={12} sm={6} md={4} key={artist.id}>
            <Card sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h6">{artist.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {artist.bio}
                </Typography>
                <Box sx={{ marginTop: 1, display: "flex", justifyContent: "flex-end" }}>
                  <IconButton color="primary" onClick={() => handleEdit(artist)}>
                    <Edit2 size={18} />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(artist.id)}>
                    <Trash2 size={18} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ArtistList;
