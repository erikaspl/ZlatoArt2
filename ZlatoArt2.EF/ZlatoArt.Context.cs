﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ZlatoArt2.EF
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using ZlatoArt2.Model;
    
    public partial class ZlatoartContext : DbContext
    {
        public ZlatoartContext()
            : base("name=ZlatoartContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<ArtistInfo> ArtistInfoes { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<ArtworkInfo> ArtworkInfoes { get; set; }
        public DbSet<Artwork> Artworks { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<LabelInfo> LabelInfoes { get; set; }
        public DbSet<Label> Labels { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Slider> Sliders { get; set; }
        public DbSet<Social> Socials { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<AnnouncementInfo> AnnouncementInfoes { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
