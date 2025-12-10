from pydantic import BaseModel
from typing import List, Optional


class ArtworkBase(BaseModel):
    title: str
    description: Optional[str] = None
    artist_id: int


class ArtworkCreate(ArtworkBase):
    pass


class Artwork(ArtworkBase):
    id: int

    class Config:
        orm_mode = True


class ArtistBase(BaseModel):
    name: str
    bio: Optional[str] = None


class ArtistCreate(ArtistBase):
    pass


class Artist(ArtistBase):
    id: int
    artworks: List[Artwork] = []

    class Config:
        orm_mode = True


class ExhibitionBase(BaseModel):
    title: str
    location: Optional[str] = None


class ExhibitionCreate(ExhibitionBase):
    artist_ids: List[int] = []
    artwork_ids: List[int] = []


class Exhibition(ExhibitionBase):
    id: int
    artists: List[Artist] = []
    artworks: List[Artwork] = []

    class Config:
        orm_mode = True
