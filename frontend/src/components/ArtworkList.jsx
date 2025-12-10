import React, { useEffect, useState } from "react";
import { api } from "../api";
import ArtworkForm from "./forms/ArtworkForm";
import { Trash2, Edit2 } from "lucide-react";
import { Box, Card, CardContent, Typography, IconButton, Grid } from "@mui/material";

const ArtworkList = () => {
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [editingArtwork, setEditingArtwork] = useState(null);

  const fetchArtworks = async () => {
    const res = await api.get("/artworks/");
    setArtworks(res.data);
  };

  const fetchArtists = async () => {
    const res = await api.get("/artists/");
    setArtists(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/artworks/${id}`);
    fetchArtworks();
  };

  const handleEdit = (artwork) => setEditingArtwork(artwork);

  useEffect(() => {
    fetchArtworks();
    fetchArtists();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2, color: "#283593" }}>
        Artworks
      </Typography>

      <Box sx={{ marginBottom: 3, background: "#e8eaf6", padding: 2, borderRadius: 2 }}>
        <ArtworkForm
          fetchArtworks={fetchArtworks}
          artists={artists}
          editingArtwork={editingArtwork}
          setEditingArtwork={setEditingArtwork}
        />
      </Box>

      <Grid container spacing={3}>
        {artworks.map((art) => (
          <Grid item xs={12} sm={6} md={4} key={art.id}>
            <Card sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h6">{art.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Artist ID: {art.artist_id}
                </Typography>
                <Box sx={{ marginTop: 1, display: "flex", justifyContent: "flex-end" }}>
                  <IconButton color="primary" onClick={() => handleEdit(art)}>
                    <Edit2 size={18} />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(art.id)}>
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

export default ArtworkList;
