define(['durandal/app','i18next', 'breeze'], function (app, i18n, breeze) {
    var remoteServiceName = '/breeze/ZlatoArt';
    var mvcControllerUrl = '/api/'
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    var languageChangeEvent = 'languageChangeEvent';
    var widthChangeEvent = 'widthChangeEvent';
    var httpRequestStartEvent = 'httpRequest:start';
    var httpRequestEndEvent = 'httpRequest:end';
    var language = ko.observable('');

    language.subscribe(function(newValue){
      app.trigger(languageChangeEvent, newValue);
    });

    var ajaxAdapter = breeze.config.getAdapterInstance("ajax");
    ajaxAdapter.defaultSettings = {
           beforeSend: function(){
              app.trigger(httpRequestStartEvent);
           },
           complete: function() {
              app.trigger(httpRequestEndEvent);
           }
    };

    var windowSize = {
      width: ko.observable(),
      height: ko.observable()
    };

    windowSize.width.subscribe(function(newValue){
      app.trigger(widthChangeEvent, newValue);
    });

    var $window = $(window);

    $window.resize(function(){
      setWindowSize();
    });

    var showBackToTop = ko.observable(false);
    $window.scroll(function(){
      if ($(this).scrollTop() > 100) {
        showBackToTop(true);
      } else {
        showBackToTop(false);
      }
    })

    var setWindowSize = function(){
      windowSize.width(window.innerWidth);
      windowSize.height(window.innerHeight);
    }

    var screenWidths = {
      md: 767
    };

    var screenModes = {
      lg: "large",
      md: "medium",
      sm: "small"
    };

    var screenMode = ko.computed(function(){
      if (windowSize.width() > screenWidths.md){
        return screenModes.lg;
      };
      if (windowSize.width() < screenWidths.md){
        return screenModes.md;
      };
      return screenModes.lg;
    });

    /*
     * returns a computed value for a given key. As it is dependent on the current
     * active language the outcome will change when the language changes.
     */
    ko.i18n = function(key) {
      return ko.computed(function() {
        if (language() != null) {
          return i18n.t(key, {
            lng : language()
          });
        } else {
          return "";
        }
      }, key);
    };

    ko.bindingHandlers.script = {
      update: function( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
        var scriptName = ko.utils.unwrapObservable(valueAccessor());
        $(element).html("<script src='" + scriptName + "'></script>");
      }
    };

    ko.bindingHandlers.googleTranslate = {
      update: function( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
        var language = valueAccessor();
        $(element).html('<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script> <script>function googleTranslateElementInit() { new google.translate.TranslateElement({ pageLanguage: "'+language+'", autoDisplay: false }, "google_translate_element");}</script>');
      }
    };

    ko.bindingHandlers.zlatoEmail = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            $(element).html('<a href="mailto:info@zlatoart.com" title="CLICK TO EMAIL US">info@zlatoart.com</a>');
        }
    };

    ko.bindingHandlers.fadeVisible = {
        init: function(element, valueAccessor){
          var value = valueAccessor();
          $(element).toggle(ko.unwrap(value));
        },

        update: function(element, valueAccessor){
            var value = valueAccessor();
            ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
        }
    };

    var imageSettings = {
        imageBaseLocalPath: '../content/images/',
        imageBaseRemotePath: "http://assets.zlatoart.com/images/"
    };

    var hashes = {
      artists: 'artists',
      collection: 'artcollection',
      artists: 'artists',
      contact: 'contact'
    };

    var routes = [
            { route: '', title: ko.i18n('app:menu.home'), moduleId: 'viewmodels/home', nav: true },
            { route: 'artcollection(/:artist)', title: ko.i18n('app:menu.collection'), moduleId: 'viewmodels/collection', hash: hashes.collection, nav: true },
            { route: 'artists(/:artist)', title: ko.i18n('app:menu.artists'), moduleId: 'viewmodels/artists', hash: hashes.artists, nav: true },
            { route: 'contact',  title: ko.i18n('app:menu.contact'), moduleId: 'viewmodels/contact', hash: hashes.contact, nav: true }
    ];

    var loadIndicator = ko.observable("Images/ajax-loader-thumb.gif");

    return {
        debugEnabled: ko.observable(true),
        imageSettings: imageSettings,
        remoteServiceName: remoteServiceName,
        mvcControllerUrl: mvcControllerUrl,
        languageChangeEvent: languageChangeEvent,
        widthChangeEvent: widthChangeEvent,
        httpRequestStartEvent: httpRequestStartEvent,
        httpRequestEndEvent: httpRequestEndEvent,
        routes: routes,
        defaultArtist: 'martynchuk',   
        announcements: ko.observableArray([]),        
        language: language,
        hashes: hashes,
        loadIndicator: loadIndicator,
        screenMode: screenMode,
        screenModes: screenModes,
        setWindowSize: setWindowSize,
        showBackToTop: showBackToTop
    };
});