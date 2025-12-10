from http.client import HTTPException

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import models
import schemas
from database import Base, engine, get_db

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Art Gallery API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Welcome to the Art Gallery Backend Service!"}


# CRUD за уметници
@app.post("/artists/", response_model=schemas.Artist)
def create_artist(artist: schemas.ArtistCreate, db: Session = Depends(get_db)):
    db_artist = models.Artist(name=artist.name, bio=artist.bio)
    db.add(db_artist)
    db.commit()
    db.refresh(db_artist)
    return db_artist


@app.get("/artists/", response_model=list[schemas.Artist])
def get_artists(db: Session = Depends(get_db)):
    return db.query(models.Artist).all()


# Update Artist
@app.put("/artists/{artist_id}", response_model=schemas.Artist)
def update_artist(artist_id: int, artist: schemas.ArtistCreate, db: Session = Depends(get_db)):
    db_artist = db.query(models.Artist).filter(models.Artist.id == artist_id).first()
    if not db_artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    db_artist.name = artist.name
    db_artist.bio = artist.bio
    db.commit()
    db.refresh(db_artist)
    return db_artist


# Delete Artist
@app.delete("/artists/{artist_id}")
def delete_artist(artist_id: int, db: Session = Depends(get_db)):
    db_artist = db.query(models.Artist).filter(models.Artist.id == artist_id).first()
    if not db_artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    db.delete(db_artist)
    db.commit()
    return {"message": "Artist deleted"}


# CRUD за уметнички дела
@app.post("/artworks/", response_model=schemas.Artwork)
def create_artwork(artwork: schemas.ArtworkCreate, db: Session = Depends(get_db)):
    db_artwork = models.Artwork(title=artwork.title, description=artwork.description, artist_id=artwork.artist_id)
    db.add(db_artwork)
    db.commit()
    db.refresh(db_artwork)
    return db_artwork


@app.get("/artworks/", response_model=list[schemas.Artwork])
def get_artworks(db: Session = Depends(get_db)):
    return db.query(models.Artwork).all()


# Update Artwork
@app.put("/artworks/{artwork_id}", response_model=schemas.Artwork)
def update_artwork(artwork_id: int, artwork: schemas.ArtworkCreate, db: Session = Depends(get_db)):
    db_artwork = db.query(models.Artwork).filter(models.Artwork.id == artwork_id).first()
    if not db_artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    db_artwork.title = artwork.title
    db_artwork.description = artwork.description
    db_artwork.artist_id = artwork.artist_id
    db.commit()
    db.refresh(db_artwork)
    return db_artwork


# Delete Artwork
@app.delete("/artworks/{artwork_id}")
def delete_artwork(artwork_id: int, db: Session = Depends(get_db)):
    db_artwork = db.query(models.Artwork).filter(models.Artwork.id == artwork_id).first()
    if not db_artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    db.delete(db_artwork)
    db.commit()
    return {"message": "Artwork deleted"}


# CRUD за изложби
@app.post("/exhibitions/", response_model=schemas.Exhibition)
def create_exhibition(exhibition: schemas.ExhibitionCreate, db: Session = Depends(get_db)):
    db_exhibition = models.Exhibition(title=exhibition.title, location=exhibition.location)
    db_exhibition.artists = db.query(models.Artist).filter(models.Artist.id.in_(exhibition.artist_ids)).all()
    db_exhibition.artworks = db.query(models.Artwork).filter(models.Artwork.id.in_(exhibition.artwork_ids)).all()
    db.add(db_exhibition)
    db.commit()
    db.refresh(db_exhibition)
    return db_exhibition


@app.get("/exhibitions/", response_model=list[schemas.Exhibition])
def get_exhibitions(db: Session = Depends(get_db)):
    return db.query(models.Exhibition).all()


# Update Exhibition
@app.put("/exhibitions/{exhibition_id}", response_model=schemas.Exhibition)
def update_exhibition(exhibition_id: int, exhibition: schemas.ExhibitionCreate, db: Session = Depends(get_db)):
    db_exhibition = db.query(models.Exhibition).filter(models.Exhibition.id == exhibition_id).first()
    if not db_exhibition:
        raise HTTPException(status_code=404, detail="Exhibition not found")
    db_exhibition.title = exhibition.title
    db_exhibition.location = exhibition.location
    db_exhibition.artists = db.query(models.Artist).filter(models.Artist.id.in_(exhibition.artist_ids)).all()
    db_exhibition.artworks = db.query(models.Artwork).filter(models.Artwork.id.in_(exhibition.artwork_ids)).all()
    db.commit()
    db.refresh(db_exhibition)
    return db_exhibition


# Delete Exhibition
@app.delete("/exhibitions/{exhibition_id}")
def delete_exhibition(exhibition_id: int, db: Session = Depends(get_db)):
    db_exhibition = db.query(models.Exhibition).filter(models.Exhibition.id == exhibition_id).first()
    if not db_exhibition:
        raise HTTPException(status_code=404, detail="Exhibition not found")
    db.delete(db_exhibition)
    db.commit()
    return {"message": "Exhibition deleted"}
