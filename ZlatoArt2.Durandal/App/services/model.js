define(['config', 'services/logger', 'durandal/system', 'breeze', 'knockout'],
    function (config, logger, system, breeze, ko) {

        var Validator = breeze.Validator;

        var orderBy = {
            social: 'name'
        }

        var entityNames = {
            social: 'Social'
        }

        var model = {
            orderBy: orderBy,
            entityNames: entityNames,
            createNullos: createNullos,
            configureMetadataStore: configureMetadataStore
        }

        return model;

        function configureMetadataStore(metadataStore) {
            metadataStore.registerEntityTypeCtor(
                'Social', function () { this.isPartial = false; }, socialInitializer);
            metadataStore.registerEntityTypeCtor(
                'Language', function () { this.isPartial = false; }, languageInitializer);
            metadataStore.registerEntityTypeCtor(
                'Slider', function () { this.isPartial = false; }, sliderInitializer);
            metadataStore.registerEntityTypeCtor(
                'Image', function () { this.isPartial = false; }, imageInitializer);
            metadataStore.registerEntityTypeCtor(
                'ArtistInfo', function () { this.isPartial = false; }, artistInfoInitializer);
            metadataStore.registerEntityTypeCtor(
                'Artist', function () {this.isPartial = false;}, artistInitializer);
            metadataStore.registerEntityTypeCtor(
                'Artwork', function () { this.isPartial = false;}, artworkInitializer);
            metadataStore.registerEntityTypeCtor(
                'Message', function () { this.isPartial = false;}, messageInitializer)            
            referenceCheckValidator = createReferenceCheckValidator();
            Validator.register(referenceCheckValidator);
            log('Validators registered');
        }

        function socialInitializer(social) {
            social.midImagePath = ko.computed({
                read: function (){
                    return config.imageSettings.imageBaseRemotePath + social.midImage();
                },
                write: function(){}
            });
            social.lrgImagePath = ko.computed(function(){
                return config.imageSettings.imageBaseRemotePath + social.lrgImage();
            });
        };

        function languageInitializer(language) {
            language.flagImagePath = ko.computed(function () {
                return config.imageSettings.imageBaseRemotePath + language.flagImage();
            });
        };

        function sliderInitializer(slider) {
            slider.imageSrcPath = ko.computed(function () {
                return config.imageSettings.imageBaseRemotePath + slider.imageSrc();
            });
        };

        function imageInitializer(image) {
            image.imagePath = ko.computed(function () {
                return config.imageSettings.imageBaseRemotePath + image.link();

            });
        };

        function artistInfoInitializer(artist) {
            artist.displayNameWithNarrow = ko.computed(function (){ 
                return artist.displayName() + ' →';
            });
            artist.isSelected = ko.observable();
            artist.artistHash = ko.computed(function(){
                return config.hashes.artists + '/' + artist.artist().hash();
            });
        };

        function artistInitializer(artist){
            artist.artistLink = ko.computed(function(){
                return config.hashes.artists + '/' + artist.hash();
            });
            artist.collectionLink = ko.computed(function(){
                return config.hashes.collection + '/' + artist.hash();
            });
            artist.imagePath = ko.computed(function(){
                return config.imageSettings.imageBaseRemotePath + artist.imageLink();
            });
        };

        function messageInitializer(message){
            message.fullName.extend({required: true});
            message.email.extend({email: true, required: true});
            message.text.extend({required: true});
            message.dirtyFlag = new ko.DirtyFlag([message.email, message.text]);
        };

        function artworkInitializer(artwork){
            artwork.imagePath = ko.computed(function(){
                return config.imageSettings.imageBaseRemotePath + artwork.imageLink();
            });
            artwork.thumbPath = ko.computed(function(){
                return config.imageSettings.imageBaseRemotePath + artwork.thumbLink();
            });
            artwork.ImageThumbObj = new Image();

            var CreateDelegate = function(contextObject, delegateMethod){
                return function () {
                    return delegateMethod.apply(contextObject, arguments);
                };
            };

            artwork.ImageThumbObj.onload = CreateDelegate(artwork, 
                function (){
                    var that = this;
                    that.thumbLoaded(true);
                });

            //artwork.ImageThumbObj.src = artwork.thumbPath();
            artwork.thumbLoaded = ko.observable(false);
            artwork.thumb = ko.computed(function(){
                if (artwork.thumbLoaded()){
                    return artwork.ImageThumbObj.src;
                }
                return config.loadIndicator();
            });
        };

        function createReferenceCheckValidator() {
            var name = 'realReferenceObject';
            var ctx = { messageTemplate: 'Missing %displayName%' };
            var val = new Validator(name, valFunction, ctx);
            log('Validators created');
            return val;

            function valFunction(value, context) {
                return value ? value.id() !== 0 : true;
            }
        };

        function createNullos(manager) {
            var unchanged = breeze.EntityState.Unchanged;

            createNullo(entityNames.social);

            function createNullo(entityName, values) {
                var initialValues = values;
                //    || { name: ' [Select a ' + entityName.toLowerCase() + ']' };
                return manager.createEntity(entityName, initialValues, unchanged);
            }
        };

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(model), showToast);
        };
});