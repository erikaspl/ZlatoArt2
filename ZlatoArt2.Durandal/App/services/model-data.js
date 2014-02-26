define(['durandal/app', 'i18next', 'config'], function(app, i18n, config){

	var labels = {
		aboutUs: ko.i18n('app:labels.aboutUs'),
		meetArtists: ko.i18n('app:labels.meetArtists'),
		viewCollection: ko.i18n('app:labels.viewCollection'),
		followUs: ko.i18n('app:labels.followUs'),
		emailPlaceHolder: ko.i18n('app:labels.emailPlaceHolder'),
		signUpButton: ko.i18n('app:labels.signUpButton'),
		signUpForNews: ko.i18n('app:labels.signUpForNews'),
		contactUsBtn: ko.i18n('app:labels.contactUsBtn'),
		signUpForNewsLong: ko.i18n('app:labels.signUpForNewsLong'),
		artists: {
			header: ko.i18n('app:labels.artists.header'),
			viewPaintings: ko.i18n('app:labels.artists.viewPaintings')
		},
		collection: {
			header: ko.i18n('app:labels.collection.header'),
			artists: ko.i18n('app:labels.collection.artists')
		},
		contact: {
			header: ko.i18n('app:labels.contact.header'),
			zlatoArt: ko.i18n('app:labels.contact.zlatoArt'),
			phone: ko.i18n('app:labels.contact.phone'),
			email: ko.i18n('app:labels.contact.email'),
			signUpForNews: ko.i18n('app:labels.contact.signUpForNews'),
			stayUpdated: ko.i18n('app:labels.contact.stayUpdated'),
			followUs: ko.i18n('app:labels.contact.followUs'),
			fullName: ko.i18n('app:labels.contact.fullName'),
			messageEmail: ko.i18n('app:labels.contact.messageEmail'),
			subject: ko.i18n('app:labels.contact.subject'),
			message: ko.i18n('app:labels.contact.message'),
			sendMessage: ko.i18n('app:labels.contact.sendMessage'),
			emailDelivered: ko.i18n('app:labels.contact.emailDelivered'),
			unableToDeliverEmail: ko.i18n('app:labels.contact.unableToDeliverEmail')

		},
		footer: {
			signUpForNews: ko.i18n('app:labels.footer.signUpForNews'),
			stayUpdated: ko.i18n('app:labels.footer.stayUpdated'),
			contactUs: ko.i18n('app:labels.footer.contactUs'),
			email: ko.i18n('app:labels.footer.email'),
			followUs: ko.i18n('app:labels.footer.followUs'),
			partners: ko.i18n('app:labels.footer.partners')
		}
	};

	var images = ko.observableArray([]);
	var getImageObj = function(imageName){
		return _.find(images(), function(image){
			return image.name() === imageName;
		});
	};

	var socials = ko.observableArray([]);

	var artists = ko.observableArray([]);
	var artworks = ko.observableArray([]);

	var selectedArtistName = ko.observable('');

    var selectedArtist = ko.computed(function () {
        var currentArtist = _.find(artists(), function (artistInfo) {
            return (artistInfo.artist().hash() == selectedArtistName());
        });
        if (currentArtist){
           setIsSelected(currentArtist);
        }
        return currentArtist;
    });

    var setIsSelected = function(artist){
        _.each(artists(), function(artist){
            artist.isSelected(false);
        });
        artist.isSelected(true);
    };

    var hasArtists = ko.computed({
        read: function () {
            return artists().length > 0;
        }
    });

    var hasArtworks = ko.computed({
        read: function () {
            return artworks().length > 0;
        }
    });

	return{
		labels: labels,
		socials: socials,
		images: images,
		getImageObj: getImageObj,
		artists: artists,
		selectedArtistName: selectedArtistName,
		selectedArtist: selectedArtist,
		hasArtists: hasArtists,
		hasArtworks: hasArtworks,
		artworks: artworks
	}
});