using System;
using System.Web.Optimization;

namespace ZlatoArt2.Durandal {
  public class DurandalBundleConfig {
    public static void RegisterBundles(BundleCollection bundles) {
      bundles.IgnoreList.Clear();
      AddDefaultIgnorePatterns(bundles.IgnoreList);

	  bundles.Add(
		new ScriptBundle("~/lib/vendor")
            .Include("~/lib/jquery/jquery-{version}.js")
            .Include("~/lib/jquery/jquery.flexslider.js")
            .Include("~/lib/jquery/jquery.fancybox.js")
            .Include("~/lib/jquery/jquery.fancybox-thumbs.js")
            .Include("~/lib/knockout/knockout-{version}.js")
            .Include("~/lib/knockout/knockout.activity.js")
            .Include("~/lib/knockout/knockout.command.js")
            .Include("~/lib/knockout/knockout.validation.js")
            .Include("~/lib/knockout/knockout.dirtyFlag.js")
            .Include("~/lib/toastr/js/toastr.js")
            .Include("~/lib/underscore/underscore.js")
		);

      bundles.Add(
        new StyleBundle("~/styles")
          .Include("~/css/import.css")
          .Include("~/lib/bootstrap/css/bootstrap.css")
          .Include("~/lib/bootstrap/css/bootstrap-responsive.css")
          .Include("~/lib/toastr/css/toastr.css")
          .Include("~/lib/font-awesome/css/font-awesome.css")
          .Include("~/css/ie10mobile.css")
          .Include("~/lib/durandal/css/durandal.css")
          .Include("~/css/starterkit.css")
          .Include("~/css/import.css")
          .Include("~/css/blog.css")
          .Include("~/css/boxed-slider-flexslider.css")
          .Include("~/css/flexslider.css")
          .Include("~/css/gallery-folio-masonry.css")
          .Include("~/css/header-1.css")
          .Include("~/css/hero-equal-thumb-gallery.css")
          .Include("~/css/jquery.fancybox.css")
          .Include("~/css/jquery.fancybox-thumbs.css")
          .Include("~/css/portfolio.css")
          .Include("~/css/socialicoregular.css")
          .Include("~/css/style.css")
          .Include("~/css/tabs-toggle.css")
          .Include("~/css/toastr.css")
          .Include("~/css/zlatoart.css")
        );
    }

    public static void AddDefaultIgnorePatterns(IgnoreList ignoreList) {
      if(ignoreList == null) {
        throw new ArgumentNullException("ignoreList");
      }

      ignoreList.Ignore("*.intellisense.js");
      ignoreList.Ignore("*-vsdoc.js");
      ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
      //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
      //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
    }
  }
}