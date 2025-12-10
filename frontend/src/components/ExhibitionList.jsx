import React, { useEffect, useState } from "react";
import { api } from "../api";
import ExhibitionForm from "./forms/ExhibitionForm";
import { Trash2, Edit2 } from "lucide-react";
import { Box, Card, CardContent, Typography, IconButton, Grid } from "@mui/material";

const ExhibitionList = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [editingExhibition, setEditingExhibition] = useState(null);

  const fetchExhibitions = async () => {
    const res = await api.get("/exhibitions/");
    setExhibitions(res.data);
  };

  const fetchArtists = async () => {
    const res = await api.get("/artists/");
    setArtists(res.data);
  };

  const fetchArtworks = async () => {
    const res = await api.get("/artworks/");
    setArtworks(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/exhibitions/${id}`);
    fetchExhibitions();
  };

  const handleEdit = (ex) => setEditingExhibition(ex);

  useEffect(() => {
    fetchExhibitions();
    fetchArtists();
    fetchArtworks();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2, color: "#1b5e20" }}>
        Exhibitions
      </Typography>

      <Box sx={{ marginBottom: 3, background: "#e8f5e9", padding: 2, borderRadius: 2 }}>
        <ExhibitionForm
          fetchExhibitions={fetchExhibitions}
          artists={artists}
          artworks={artworks}
          editingExhibition={editingExhibition}
          setEditingExhibition={setEditingExhibition}
        />
      </Box>

      <Grid container spacing={3}>
        {exhibitions.map((ex) => (
          <Grid item xs={12} sm={6} md={4} key={ex.id}>
            <Card sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h6">{ex.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {ex.location}
                </Typography>
                <Box sx={{ marginTop: 1, display: "flex", justifyContent: "flex-end" }}>
                  <IconButton color="primary" onClick={() => handleEdit(ex)}>
                    <Edit2 size={18} />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(ex.id)}>
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

export default ExhibitionList;
