from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base

# Many-to-Many таблици
artist_exhibition = Table(
    'artist_exhibition',
    Base.metadata,
    Column('artist_id', Integer, ForeignKey('artists.id')),
    Column('exhibition_id', Integer, ForeignKey('exhibitions.id'))
)

artwork_exhibition = Table(
    'artwork_exhibition',
    Base.metadata,
    Column('artwork_id', Integer, ForeignKey('artworks.id')),
    Column('exhibition_id', Integer, ForeignKey('exhibitions.id'))
)


class Artist(Base):
    __tablename__ = "artists"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    bio = Column(String, nullable=True)

    artworks = relationship("Artwork", back_populates="artist")
    exhibitions = relationship("Exhibition", secondary=artist_exhibition, back_populates="artists")


class Artwork(Base):
    __tablename__ = "artworks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    artist_id = Column(Integer, ForeignKey("artists.id"))

    artist = relationship("Artist", back_populates="artworks")
    exhibitions = relationship("Exhibition", secondary=artwork_exhibition, back_populates="artworks")


class Exhibition(Base):
    __tablename__ = "exhibitions"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    location = Column(String, nullable=True)

    artists = relationship("Artist", secondary=artist_exhibition, back_populates="exhibitions")
    artworks = relationship("Artwork", secondary=artwork_exhibition, back_populates="exhibitions")
