using Breeze.WebApi;
using Breeze.WebApi.EF;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using ZlatoArt2.EF;
using ZlatoArt2.Model;

namespace ZlatoArt2.Durandal.Controllers
{
    [BreezeController]
    public class ZlatoArtController : ApiController
    {
        private EFContextProvider<ZlatoartContext> _contextProvider = new EFContextProvider<ZlatoartContext>();

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        [HttpGet]
        public object Lookups()
        {
            var languages = _contextProvider.Context.Languages;

            return new { languages };
        }

        [HttpGet]
        public IQueryable<Social> Socials()
        {
            return _contextProvider.Context.Socials;
        }

        [HttpGet]
        public IQueryable<Language> Languages()
        {
            return _contextProvider.Context.Languages;
        }

        [HttpGet]
        public IQueryable<Slider> Sliders()
        {
            return _contextProvider.Context.Sliders;
        }

        [HttpGet]
        public IQueryable<AnnouncementInfo> Announcements(string language)
        {
            return _contextProvider.Context.AnnouncementInfoes.Include("Announcement").Where(ann => ann.Language.Locale == language && ann.Announcement.IsActive == true);
        }

        [HttpGet]
        public IQueryable<LabelInfo> Labels(string language)
        {
            return _contextProvider.Context.LabelInfoes.Include("Label").Where(le => le.Language.Locale == language);
        }

        [HttpGet]
        public IQueryable<ArtistInfo> Artists(string language)
        {
            return _contextProvider.Context.ArtistInfoes.Include("Artist").Where(le => le.Language.Locale == language);
        }

        [HttpGet]
        public IQueryable<ArtworkInfo> ArtworkInfoes()
        {
            return _contextProvider.Context.ArtworkInfoes.Include("Artwork");
        }

        [HttpGet]
        public IQueryable<Image> Images()
        {
            return _contextProvider.Context.Images;
        }
    }
}
