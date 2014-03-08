define(['durandal/system','services/model','config', 'services/logger', 'Q'], 
    function (system, model, config, logger, Q) {

    var EntityQuery = breeze.EntityQuery;
    var entityNames = model.entityNames;
    var manager = configureBreezeManager();
    var orderBy = model.orderBy;

    var setSocials = function (socialObservable, forceRemote) {

        var query = EntityQuery.from('Socials').orderBy(orderBy.social);
        if (!forceRemote) {
            var results = manager.executeQueryLocally(query);
            if (socialObservable) {
                socialObservable(results);
                return Q.resolve();
            }
        }
           
        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (socialObservable) {
                socialObservable(data.results);
            }

            log('Retrieved Socials from remote data source', data, true);
        }
    };

    var setLabels = function (labelObservable, forceRemote, language){

        var query = EntityQuery.from('Labels').withParameters({language: language});
        if (!forceRemote){
            var results = manager.executeQueryLocally(query);
            if (labelObservable) {
                labelObservable(results);
                return Q.resolve();
            }
        }

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data){
            if (labelObservable){
                labelObservable(data.results);
            }

            log('Retrieved Labels from remote data source', data, true);
        }
    };

    var setLanguages = function (languageObservable, forceRemote) {
        var query = EntityQuery.from('Languages');
        if (!forceRemote) {
            var results = manager.executeQueryLocally(query);
            if (languageObservable) {
                languageObservable(results);
                return Q.resolve();
            }
        }

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (languageObservable) {
                languageObservable(data.results);
            }

            log('Retrieved Languages from remote data source', data.results, true);
        }
    };

    var setSliders = function (sliderObservable, forceRemote) {
        var query = EntityQuery.from('Sliders');
        if (!forceRemote) {
            var results = manager.executeQueryLocally(query);
            if (sliderObservable) {
                sliderObservable(results);
                return Q.resolve();
            }
        }

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (sliderObservable) {
                sliderObservable(data.results);
            }

            log('Retrieved Sliders from remote data source', data.results, true);
        }
    };

    var setImages = function (imagesObservable, forceRemote){
        var query = EntityQuery.from('Images');
        if (!forceRemote) {
            var results = manager.executeQueryLocally(query);
            if (imagesObservable) {
                imagesObservable(results);
                return Q.resolve();
            }
        }

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (imagesObservable){
                imagesObservable(data.results);
            }

            log('Retrieved Images from remote data source', data.results, true);
        }
    };

    var setAnnouncements = function (announcementObservable, forceRemote, language) {
        var query = EntityQuery.from('Announcements').withParameters({language: language});
        if (!forceRemote) {
            var results = manager.executeQueryLocally(query);
            if (announcementObservable) {
                announcementObservable(results);
                return Q.resolve();
            }
        }

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (announcementObservable) {
                announcementObservable(data.results);
            }

            log('Retrieved [Announcements] from remote data source', data.results, true);
        }
    };

    var setArtists = function(artistsObservable, forceRemote, language) {
        var query = EntityQuery.from('Artists').withParameters({language: language});
        if (!forceRemote) { 
            var results = manager.executeQueryLocally(query);
            if (artistsObservable) {
                artistObservable(results);
                return Q.resolve();
            }
        }

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (artistsObservable){
                artistsObservable(data.results);
            }

            log('Retrieved Artists from remote data souces', data.results, true);
        }
    };

    var setArtworks = function(artworksObservable, forceRemote, language){
        var query = EntityQuery.from('ArtworkInfoes');
        if (language){
            var query = query.where("language.locale", "==", language);
        }
        if (!forceRemote) {
            var results = manager.executeQueryLocally(query);
            if (artworksObservable) {
                artworksObservable(results);
                return Q.resolve();
            }
        }

        return manager.executeQuery(query) 
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (artworksObservable) {
                artworksObservable(data.results);
            }

            log('Retrieved Artworks from remote data souces', data.results, true);
        }
    };

    var primeData = function (modelData) {
        var promise = Q.all([
            //getLookups(),
            setLanguages(null, true),
            setSocials(modelData.socials, true),
            setSliders(null, true),
            setImages(modelData.images, true)]);            
            //setLabels(null, true, config.languageId())]);
            //.then(applyValidators);

        return promise;

        function success() {
            //datacontext.lookups = {
            //    social: getLocal('Socials', 'name', true)
            //};
            //log('Primed data', datacontext.lookups);
        }

        //function applyValidators() {
        //    model.applySessionValidators(manager.metadataStore);
        //}
    };

    var createBlankMessage = function(){
        return manager.createEntity('Message');
    };

    var saveMessage = function(message){
        var url = config.mvcControllerUrl + "Message/Post";
        var deferred = Q.defer();
        $.post(url, {text: message.text, subject: message.subject, email: message.email, fullName: message.fullName })
            .success(function(){
                deferred.resolve();
            })
            .fail(function(){
                deferred.reject();
            });

        return deferred.promise;
    }
   
    var datacontext = {
        primeData: primeData,
        setSocials: setSocials,
        setSliders: setSliders,
        setAnnouncements: setAnnouncements,
        setLanguages: setLanguages,
        setLabels: setLabels,
        setImages: setImages,
        setArtists: setArtists,
        setArtworks: setArtworks,
        createBlankMessage: createBlankMessage,
        saveMessage: saveMessage
    }

    return datacontext;

    function getLocal(resource, ordering, includeNullos) {
        var query = EntityQuery.from(resource)
            .orderBy(ordering);
        if (!includeNullos) {
            query = query.where('id', '!=', 0);
        }
        return manager.executeQueryLocally(query);
    };

    function getErrorMessages(error) {
        var msg = error.message;
        if (msg.match(/validation error/i)) {
            return getValidationMessages(error);
        }
        return msg;
    };

    function getLookups() {
        return EntityQuery.from('Lookups')
            .using(manager).execute()
            .then(function (data) {
                model.createNullos(manager);
            })
            .fail(queryFailed);
    };

    function configureBreezeManager() {
        breeze.NamingConvention.camelCase.setAsDefault();
        var mgr = new breeze.EntityManager(config.remoteServiceName);
        model.configureMetadataStore(mgr.metadataStore);
        return mgr;
    };

    function processLookups(manager) {
        model.createNullos(manager);
    };

    function queryFailed(error) {
        var msg = 'Error retreiving data. ' + error.message;
        logError(msg, error);
        throw error;
    };

    function log(msg, data, showToast) {
        logger.log(msg, data, system.getModuleId(datacontext), showToast);
    };

    function logError(msg, error) {
        logger.logError(msg, error, system.getModuleId(datacontext), true);
    }
});