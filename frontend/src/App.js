import React, { useState } from "react";
import ArtistList from "./components/ArtistList.jsx";
import ArtworkList from "./components/ArtworkList.jsx";
import ExhibitionList from "./components/ExhibitionList";
import { Box, Button, Typography } from "@mui/material";

export default function App() {
  const [view, setView] = useState("artists"); // default view

  const buttonStyle = {
    marginRight: "10px",
    background: "#8e24aa",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 20px",
    transition: "0.3s",
  };

  const hoverStyle = {
    background: "#ba68c8",
  };

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100vh",
        background: "linear-gradient(160deg, #fff3e0, #f3e5f5)",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          marginBottom: 4,
          color: "#6a1b9a",
          textShadow: "2px 2px #f3e5f5",
        }}
      >
        Art Gallery Management
      </Typography>

      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Button
          sx={buttonStyle}
          onClick={() => setView("artists")}
          onMouseOver={(e) => (e.currentTarget.style.background = hoverStyle.background)}
          onMouseOut={(e) => (e.currentTarget.style.background = buttonStyle.background)}
        >
          Artists
        </Button>
        <Button
          sx={buttonStyle}
          onClick={() => setView("artworks")}
          onMouseOver={(e) => (e.currentTarget.style.background = hoverStyle.background)}
          onMouseOut={(e) => (e.currentTarget.style.background = buttonStyle.background)}
        >
          Artworks
        </Button>
        <Button
          sx={buttonStyle}
          onClick={() => setView("exhibitions")}
          onMouseOver={(e) => (e.currentTarget.style.background = hoverStyle.background)}
          onMouseOut={(e) => (e.currentTarget.style.background = buttonStyle.background)}
        >
          Exhibitions
        </Button>
      </Box>

      <Box>
        {view === "artists" && <ArtistList />}
        {view === "artworks" && <ArtworkList />}
        {view === "exhibitions" && <ExhibitionList />}
      </Box>
    </Box>
  );
}
