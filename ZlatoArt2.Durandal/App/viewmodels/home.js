define(['services/datacontext', 'config', 'services/model-data', 'plugins/router'], function (datacontext, config, modelData, router) {
    var sliders = ko.observableArray();
    var sliderInitialzed = false;

    var announcementText = ko.observable('');
    var aboutUsText = ko.observable('');

    var viewArtworksImg = ko.computed(function(){
        return modelData.getImageObj('view-artworks');
    });

    var viewArtistsImg = ko.computed(function(){
        return modelData.getImageObj('meet-artists');
    });

    var artworkClick = function () {
        router.navigate(config.hashes.collection);
    };

    var artistsClick = function () {
        router.navigate(config.hashes.artists);
    };

    var contactClick = function () {

    };

    var getAnnouncement = function(annName){
        var ann = _.find(config.announcements(), function(ann){
            return (ann.announcement().name() === annName);
        });

        var annText = '';

        if (ann){
            annText = ann.text();
        }

        return annText;
    };

    var announcements = {
     main: ko.computed(function () {
         return getAnnouncement('main');
     }),

     aboutUs: ko.computed(function(){
         return getAnnouncement('aboutUs');
     })
    };

    var activate = function () {
        if (!sliderInitialzed) {
            datacontext.setSliders(sliders, false);
        }
    };
    var compositionComplete = function (view, parent) {
        $('.flexslider').flexslider({
            controlNav: false,
            animation: "fade",
            animationLoop: true,
            slideshow: true
        });
        sliderInitialzed = true;
    };

    return {        
        activate: activate,
        compositionComplete: compositionComplete,
        sliders: sliders,
        labels: modelData.labels,
        announcements: announcements,
        artworkClick: artworkClick,
        artistsClick: artistsClick,
        contactClick: contactClick,
        viewArtworksImg: viewArtworksImg,
        viewArtistsImg: viewArtistsImg
    };
});