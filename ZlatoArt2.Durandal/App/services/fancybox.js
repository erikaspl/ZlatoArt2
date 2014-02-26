define(function () {
        //	FANCY BOX WITH BUTON HELPERS AND THUMBNAILS USED IN GALLERY or PORTFOLIO PAGE
        var fancyBoxFancyme = function () {
                $(".fancyme").fancybox({
                    prevEffect: 'elastic',
                    nextEffect: 'elastic',
                    padding: 0,
                    closeBtn: true,
                    helpers: {
                        title: { type: 'inside' },
                        //buttons: {},
                        thumbs: {
                            width: 75,
                            height: 50
                        }
                    }
                });
            }; 
        //	FANCY BOX FOR OTHER STUFF (google maps, ajax)
        var fancyBoxVarious = function () {
                $(".various").fancybox({
                    maxWidth: 1000,
                    maxHeight: 600,
                    fitToView: false,
                    width: '100%',
                    height: '100%',
                    autoSize: false,
                    prevEffect: 'elastic',
                    nextEffect: 'elastic',
                    closeClick: true,
                    padding: 0,
                    openEffect: 'fade',
                    closeEffect: 'fade',
                    helpers: {
                        title: {
                            type: 'inside'
                        }
                    }
                });
            };
        //	SINGLE IMAGE
        var fancyBoxSingle = function () {
                $(".fancysingle ").fancybox({
                    prevEffect: 'elastic',
                    nextEffect: 'elastic',
                    padding: 0,
                    closeBtn: true,
                    helpers: {
                        title: { type: 'inside' }
                    }
                });
            };
        //	FANCY BOX WITH BUTON HELPER ONLY for back and next but no thumbs
        var fancyBoxButton = function () {

                $(".fancybutton").fancybox({
                    prevEffect: 'elastic',
                    padding: 0,
                    nextEffect: 'elastic',
                    closeBtn: true,
                    helpers: {
                        title: { type: 'inside' },
                        buttons: {}
                    }
                });
            };
        //	FANCY BOX MEDIA FOR VIDEOS
        var fancyBoxMedia = function () {
                $('.fancybox-media').fancybox({
                    beforeLoad: function () {
                        this.title = $(this.element).next('.entry-summary').html();
                    },
                    prevEffect: 'none',
                    padding: 0,
                    nextEffect: 'none',
                    helpers: {
                        media: {},
                        title: { type: 'inside' }
                    }
                });
            };

        return {
            fancyBoxFancyme: fancyBoxFancyme,
            fancyBoxVarious: fancyBoxVarious,
            fancyBoxSingle: fancyBoxSingle,
            fancyBoxButton: fancyBoxButton,
            fancyBoxMedia: fancyBoxMedia
        };
    });