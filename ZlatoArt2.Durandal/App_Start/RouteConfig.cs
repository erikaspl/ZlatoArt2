using System.Web.Mvc;
using System.Web.Routing;

namespace ZlatoArt2.Durandal
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
              name: "Default",
              url: "{*url}",
              defaults: new { controller = "Home", action = "Index" }
              );
        }
    }
}