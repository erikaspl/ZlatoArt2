define(['plugins/router', 'durandal/app', 'knockout', 'breeze', 'services/datacontext', 'services/model-data', 'config', 'i18next'], 
    function (router, app, ko, breeze, datacontext, modelData, config, i18n) {

    var socials = ko.observableArray();
    var languages = ko.observableArray();
    var toggleOn = ko.observable(false);
    var showMobileNav = ko.computed(function(){        
        if (config.screenMode() === config.screenModes.md){
            return toggleOn();
        } else {
            return false;
        } 
    });

    var toggleMobileNav = function(){
        var value = toggleOn();
        toggleOn(!value);
        $('.mobile-menu-holder').slideToggle('fast');
    }

    var activate = function () {        
        datacontext.primeData(modelData).then(boot);
    };

    var setLanguage = function(language){
        config.language(language.locale());  
    };

    var backToTopClick = function(){
        $("html, body").animate({
                scrollTop: 0
        }, 800);
    }

    app.on(config.languageChangeEvent).then(function(language){
        datacontext.setAnnouncements(config.announcements, true, language);
        datacontext.setArtists(modelData.artists, true, language);
        datacontext.setArtworks(modelData.artworks, false, language);
    });

    var activeHttpRequests = ko.observable(0);
    app.on(config.httpRequestStartEvent).then(function(){
        activeHttpRequests(activeHttpRequests() + 1);
    });

    app.on(config.httpRequestEndEvent).then(function(){
        activeHttpRequests(activeHttpRequests() - 1);
    });

    var isHttpRequest = ko.computed(function(){ 
            var isActive = (activeHttpRequests() > 0);
            return isActive; 
    }).extend({throttle: 300});    

    var boot = function () {
        config.setWindowSize();
        datacontext.setSocials(socials, false);
        datacontext.setLanguages(languages, false);
        
        router.map(config.routes).buildNavigationModel();

        datacontext.setArtworks(modelData.artworks, true).then(function(){
            var browserLng = window.navigator.language;
            var selectedLng = _.find(languages(), function(language){
                return (language.locale() === browserLng);
            });
            if (selectedLng){
                config.language(selectedLng.locale());  
            }else{
                config.language('en');
            }
        });      
            
        return router.activate();
    }

    return {
        router: router,
        activate: activate,
        socials: socials,
        languages: languages,
        currentLanguage: config.language,
        activate: activate,
        setLanguage: setLanguage,
        labels: modelData.labels,
        isHttpRequest : isHttpRequest,
        showMobileNav: showMobileNav,
        toggleMobileNav: toggleMobileNav,
        showBackToTop: config.showBackToTop,
        backToTop: backToTopClick
    };
});