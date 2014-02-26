define(['plugins/router','config', 'services/model-data'], function(router, config, modelData){

	var activate = function(artistName){
		var artistName = artistName || config.defaultArtist;
		modelData.selectedArtistName(artistName);
	};

	var viewPaintings = function(){
		router.navigate(modelData.selectedArtist().artist().collectionLink());
	};

	return {
		activate: activate,
		artists: modelData.artists,
		selectedArtist: modelData.selectedArtist,
		labels: modelData.labels,
		hasArtists: modelData.hasArtists,
		viewPaintings: viewPaintings
	};
});