define(['plugins/router', 'config', 'services/model-data', 'services/datacontext', 'services/fancybox'], function(router, config, modelData, datacontext, fancybox){

    var selectedArtworks = ko.computed(function(){
        if (modelData.selectedArtist()){
            var artworks = _.filter(modelData.artworks(), function(artwork){
                return (artwork.artwork().artistId() === modelData.selectedArtist().artist().id());
            });

            _.each(artworks, function(artwork){
                if (!artwork.artwork().ImageThumbObj.src){
                    artwork.artwork().ImageThumbObj.src = artwork.artwork().thumbPath();
                }
            })

            return artworks;
        }
    }).extend({throttle : 200});

	var activate = function(artistName){
		var artistName = artistName || config.defaultArtist;
		modelData.selectedArtistName(artistName);
        fancybox.fancyBoxFancyme();
	};	

	return {
		activate: activate,
		selectedArtist: modelData.selectedArtist, 
        selectedArtworks: selectedArtworks,
		artists: modelData.artists,
		artworks: modelData.artworks,
		hasArtists: modelData.hasArtists,
		hasArtworks: modelData.hasArtworks,
        labels: modelData.labels
	}
})