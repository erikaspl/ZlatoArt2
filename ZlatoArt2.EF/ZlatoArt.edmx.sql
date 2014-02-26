
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 01/31/2014 07:46:17
-- Generated from EDMX file: G:\Dropbox\dev\ZlatoArt2\ZlatoArt2.EF\ZlatoArt.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [Zlatoart];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_AnnouncementInfo_Announcement]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AnnouncementInfoes] DROP CONSTRAINT [FK_AnnouncementInfo_Announcement];
GO
IF OBJECT_ID(N'[dbo].[FK_AnnouncementInfo_Languages]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AnnouncementInfoes] DROP CONSTRAINT [FK_AnnouncementInfo_Languages];
GO
IF OBJECT_ID(N'[dbo].[FK_artist_info_To_artists]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ArtistInfoes] DROP CONSTRAINT [FK_artist_info_To_artists];
GO
IF OBJECT_ID(N'[dbo].[FK_artist_info_to_language]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ArtistInfoes] DROP CONSTRAINT [FK_artist_info_to_language];
GO
IF OBJECT_ID(N'[dbo].[FK_artwokr_info_To_artworks]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ArtworkInfoes] DROP CONSTRAINT [FK_artwokr_info_To_artworks];
GO
IF OBJECT_ID(N'[dbo].[FK_artwokr_info_To_languages]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ArtworkInfoes] DROP CONSTRAINT [FK_artwokr_info_To_languages];
GO
IF OBJECT_ID(N'[dbo].[FK_Artworks_Artists]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Artworks] DROP CONSTRAINT [FK_Artworks_Artists];
GO
IF OBJECT_ID(N'[dbo].[FK_label_info_To_languages]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[LabelInfoes] DROP CONSTRAINT [FK_label_info_To_languages];
GO
IF OBJECT_ID(N'[dbo].[FK_LabelLabelInfo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[LabelInfoes] DROP CONSTRAINT [FK_LabelLabelInfo];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[AnnouncementInfoes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AnnouncementInfoes];
GO
IF OBJECT_ID(N'[dbo].[Announcements]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Announcements];
GO
IF OBJECT_ID(N'[dbo].[ArtistInfoes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ArtistInfoes];
GO
IF OBJECT_ID(N'[dbo].[Artists]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Artists];
GO
IF OBJECT_ID(N'[dbo].[ArtworkInfoes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ArtworkInfoes];
GO
IF OBJECT_ID(N'[dbo].[Artworks]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Artworks];
GO
IF OBJECT_ID(N'[dbo].[Images]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Images];
GO
IF OBJECT_ID(N'[dbo].[LabelInfoes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[LabelInfoes];
GO
IF OBJECT_ID(N'[dbo].[Labels]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Labels];
GO
IF OBJECT_ID(N'[dbo].[Languages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Languages];
GO
IF OBJECT_ID(N'[dbo].[Messages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Messages];
GO
IF OBJECT_ID(N'[dbo].[Settings]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Settings];
GO
IF OBJECT_ID(N'[dbo].[Sliders]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Sliders];
GO
IF OBJECT_ID(N'[dbo].[Socials]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Socials];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'ArtistInfoes'
CREATE TABLE [dbo].[ArtistInfoes] (
    [Id] int  NOT NULL,
    [Text] nvarchar(max)  NOT NULL,
    [FirstName] nvarchar(50)  NULL,
    [MiddleName] nvarchar(50)  NULL,
    [LastName] nvarchar(50)  NULL,
    [DisplayName] nvarchar(50)  NOT NULL,
    [LanguageId] int  NOT NULL,
    [ArtistId] int  NOT NULL
);
GO

-- Creating table 'Artists'
CREATE TABLE [dbo].[Artists] (
    [Id] int  NOT NULL,
    [IsActive] bit  NOT NULL,
    [ImageLink] nvarchar(255)  NULL,
    [DisplayOrder] smallint  NOT NULL,
    [Hash] varchar(50)  NOT NULL
);
GO

-- Creating table 'ArtworkInfoes'
CREATE TABLE [dbo].[ArtworkInfoes] (
    [Id] int  NOT NULL,
    [Name] nvarchar(255)  NOT NULL,
    [ArtworkId] int  NOT NULL,
    [LanguageId] int  NOT NULL
);
GO

-- Creating table 'Artworks'
CREATE TABLE [dbo].[Artworks] (
    [Id] int  NOT NULL,
    [ThumbLink] nvarchar(255)  NOT NULL,
    [IsSold] bit  NOT NULL,
    [ImageLink] nvarchar(255)  NOT NULL,
    [DisplayOrder] int  NOT NULL,
    [ArtistId] int  NOT NULL
);
GO

-- Creating table 'Images'
CREATE TABLE [dbo].[Images] (
    [Id] int  NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Link] nvarchar(255)  NOT NULL
);
GO

-- Creating table 'LabelInfoes'
CREATE TABLE [dbo].[LabelInfoes] (
    [Id] int  NOT NULL,
    [Text] nvarchar(max)  NOT NULL,
    [LanguageId] int  NOT NULL,
    [LabelId] int  NOT NULL
);
GO

-- Creating table 'Labels'
CREATE TABLE [dbo].[Labels] (
    [Id] int  NOT NULL,
    [LabelName] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'Languages'
CREATE TABLE [dbo].[Languages] (
    [Id] int  NOT NULL,
    [Abbreviation] nvarchar(50)  NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [EnName] nvarchar(50)  NOT NULL,
    [FlagImage] nvarchar(255)  NOT NULL,
    [Locale] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'Settings'
CREATE TABLE [dbo].[Settings] (
    [Id] int  NOT NULL,
    [ImageLocation] nvarchar(255)  NOT NULL,
    [Type] int  NULL
);
GO

-- Creating table 'Sliders'
CREATE TABLE [dbo].[Sliders] (
    [Id] int  NOT NULL,
    [ImageSrc] nvarchar(255)  NOT NULL,
    [ImageAlt] nvarchar(255)  NOT NULL,
    [DisplayOrder] int  NOT NULL,
    [IsActive] bit  NOT NULL
);
GO

-- Creating table 'Socials'
CREATE TABLE [dbo].[Socials] (
    [Id] int  NOT NULL,
    [LrgImage] nvarchar(255)  NOT NULL,
    [Link] nvarchar(255)  NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [MidImage] nvarchar(255)  NOT NULL,
    [Title] nvarchar(50)  NOT NULL,
    [Alt] nvarchar(255)  NOT NULL
);
GO

-- Creating table 'Announcements'
CREATE TABLE [dbo].[Announcements] (
    [Id] int  NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [IsActive] bit  NOT NULL
);
GO

-- Creating table 'AnnouncementInfoes'
CREATE TABLE [dbo].[AnnouncementInfoes] (
    [Id] int  NOT NULL,
    [Text] nvarchar(max)  NOT NULL,
    [LanguageId] int  NOT NULL,
    [AnnouncementId] int  NOT NULL
);
GO

-- Creating table 'Messages'
CREATE TABLE [dbo].[Messages] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FullName] nvarchar(50)  NOT NULL,
    [Email] nvarchar(100)  NOT NULL,
    [Subject] nvarchar(100)  NOT NULL,
    [Text] nvarchar(max)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'ArtistInfoes'
ALTER TABLE [dbo].[ArtistInfoes]
ADD CONSTRAINT [PK_ArtistInfoes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Artists'
ALTER TABLE [dbo].[Artists]
ADD CONSTRAINT [PK_Artists]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ArtworkInfoes'
ALTER TABLE [dbo].[ArtworkInfoes]
ADD CONSTRAINT [PK_ArtworkInfoes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Artworks'
ALTER TABLE [dbo].[Artworks]
ADD CONSTRAINT [PK_Artworks]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Images'
ALTER TABLE [dbo].[Images]
ADD CONSTRAINT [PK_Images]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'LabelInfoes'
ALTER TABLE [dbo].[LabelInfoes]
ADD CONSTRAINT [PK_LabelInfoes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Labels'
ALTER TABLE [dbo].[Labels]
ADD CONSTRAINT [PK_Labels]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Languages'
ALTER TABLE [dbo].[Languages]
ADD CONSTRAINT [PK_Languages]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Settings'
ALTER TABLE [dbo].[Settings]
ADD CONSTRAINT [PK_Settings]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Sliders'
ALTER TABLE [dbo].[Sliders]
ADD CONSTRAINT [PK_Sliders]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Socials'
ALTER TABLE [dbo].[Socials]
ADD CONSTRAINT [PK_Socials]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Announcements'
ALTER TABLE [dbo].[Announcements]
ADD CONSTRAINT [PK_Announcements]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AnnouncementInfoes'
ALTER TABLE [dbo].[AnnouncementInfoes]
ADD CONSTRAINT [PK_AnnouncementInfoes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Messages'
ALTER TABLE [dbo].[Messages]
ADD CONSTRAINT [PK_Messages]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [ArtistId] in table 'ArtistInfoes'
ALTER TABLE [dbo].[ArtistInfoes]
ADD CONSTRAINT [FK_artist_info_To_artists]
    FOREIGN KEY ([ArtistId])
    REFERENCES [dbo].[Artists]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_artist_info_To_artists'
CREATE INDEX [IX_FK_artist_info_To_artists]
ON [dbo].[ArtistInfoes]
    ([ArtistId]);
GO

-- Creating foreign key on [LanguageId] in table 'ArtistInfoes'
ALTER TABLE [dbo].[ArtistInfoes]
ADD CONSTRAINT [FK_artist_info_to_language]
    FOREIGN KEY ([LanguageId])
    REFERENCES [dbo].[Languages]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_artist_info_to_language'
CREATE INDEX [IX_FK_artist_info_to_language]
ON [dbo].[ArtistInfoes]
    ([LanguageId]);
GO

-- Creating foreign key on [ArtworkId] in table 'ArtworkInfoes'
ALTER TABLE [dbo].[ArtworkInfoes]
ADD CONSTRAINT [FK_artwokr_info_To_artworks]
    FOREIGN KEY ([ArtworkId])
    REFERENCES [dbo].[Artworks]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_artwokr_info_To_artworks'
CREATE INDEX [IX_FK_artwokr_info_To_artworks]
ON [dbo].[ArtworkInfoes]
    ([ArtworkId]);
GO

-- Creating foreign key on [LanguageId] in table 'ArtworkInfoes'
ALTER TABLE [dbo].[ArtworkInfoes]
ADD CONSTRAINT [FK_artwokr_info_To_languages]
    FOREIGN KEY ([LanguageId])
    REFERENCES [dbo].[Languages]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_artwokr_info_To_languages'
CREATE INDEX [IX_FK_artwokr_info_To_languages]
ON [dbo].[ArtworkInfoes]
    ([LanguageId]);
GO

-- Creating foreign key on [LanguageId] in table 'LabelInfoes'
ALTER TABLE [dbo].[LabelInfoes]
ADD CONSTRAINT [FK_label_info_To_languages]
    FOREIGN KEY ([LanguageId])
    REFERENCES [dbo].[Languages]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_label_info_To_languages'
CREATE INDEX [IX_FK_label_info_To_languages]
ON [dbo].[LabelInfoes]
    ([LanguageId]);
GO

-- Creating foreign key on [ArtistId] in table 'Artworks'
ALTER TABLE [dbo].[Artworks]
ADD CONSTRAINT [FK_Artworks_Artists]
    FOREIGN KEY ([ArtistId])
    REFERENCES [dbo].[Artists]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_Artworks_Artists'
CREATE INDEX [IX_FK_Artworks_Artists]
ON [dbo].[Artworks]
    ([ArtistId]);
GO

-- Creating foreign key on [AnnouncementId] in table 'AnnouncementInfoes'
ALTER TABLE [dbo].[AnnouncementInfoes]
ADD CONSTRAINT [FK_AnnouncementInfo_Announcement]
    FOREIGN KEY ([AnnouncementId])
    REFERENCES [dbo].[Announcements]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_AnnouncementInfo_Announcement'
CREATE INDEX [IX_FK_AnnouncementInfo_Announcement]
ON [dbo].[AnnouncementInfoes]
    ([AnnouncementId]);
GO

-- Creating foreign key on [LanguageId] in table 'AnnouncementInfoes'
ALTER TABLE [dbo].[AnnouncementInfoes]
ADD CONSTRAINT [FK_AnnouncementInfo_Languages]
    FOREIGN KEY ([LanguageId])
    REFERENCES [dbo].[Languages]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_AnnouncementInfo_Languages'
CREATE INDEX [IX_FK_AnnouncementInfo_Languages]
ON [dbo].[AnnouncementInfoes]
    ([LanguageId]);
GO

-- Creating foreign key on [LabelId] in table 'LabelInfoes'
ALTER TABLE [dbo].[LabelInfoes]
ADD CONSTRAINT [FK_LabelLabelInfo]
    FOREIGN KEY ([LabelId])
    REFERENCES [dbo].[Labels]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_LabelLabelInfo'
CREATE INDEX [IX_FK_LabelLabelInfo]
ON [dbo].[LabelInfoes]
    ([LabelId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------