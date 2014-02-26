requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'toastr': '../lib/toastr/js/toastr',
        'Q': '../lib/q/q',
        'breeze': '../lib/breeze/breeze.debug',
        'underscore': '../lib/underscore/underscore',
        'i18next': '../lib/i18next/i18next.amd.withJQuery-1.7.1'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'breeze': {
            deps: ['Q'],
            exports: 'breeze'
        }
    }
});

define('jquery', function () { return jQuery; });
define('knockout', ko);
define('underscore', _);

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'durandal/binder', 'i18next'],  
    function (system, app, viewLocator, binder, i18n) {
    //>>excludeStart("build", true);
    system.debug(false);
    //>>excludeEnd("build");

    app.title = 'ZlatoArt';

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    var i18NOptions = {
        detectFromHeaders: false,
        lng: window.navigator.userLanguage || window.navigator.language || 'en',
        fallbackLang: 'en',
        ns: 'app',
        resGetPath: 'locales/__lng__/__ns__.json',
        useCookie: false,
        preload: ['ru']
    };

    var koValidationOptions = {
        decorateInputElement: true,      //default is false. Applies the .validationElement CSS class
        errorElementClass: "inputValidationError",
        decorateElementOnModified: true,        
        registerExtenders: true,    //default is true
        messagesOnModified: true,   //default is true
        insertMessages: false,       //default is true
        parseInputAttributes: true, //default is false
        writeInputAttributes: true, //default is false
        messageTemplate: null      //default is null
    }

    app.start().then(function() {          

        ko.validation.init(koValidationOptions);
        i18n.init(i18NOptions, function () {

            //Call localization on view before binding...
            binder.binding = function (obj, view) {
                $(view).i18n();
            };

            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell', 'entrance');
        });
    });
});