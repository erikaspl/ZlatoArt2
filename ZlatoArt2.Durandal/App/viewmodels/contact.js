define(['config', 'services/model-data', 'services/model', 'services/datacontext'], 
	function(config, modelData, model, datacontext) {

	var message = new datacontext.createBlankMessage();
    var showErrorMessage = ko.observable(false);
    var showSuccessMessage = ko.observable(false);

    var validationModel = ko.validatedObservable({
        Name: message.fullName,
        Email: message.email,
        Message: message.text
    });

    var resetMessage = function () {
        message.fullName('');
        message.email('');
        message.subject('');
        message.text('');
        message.dirtyFlag().reset();
    };

    var isDirty = ko.computed(function () {
        return message.dirtyFlag().isDirty() && validationModel.isValid();
    });

    var saveCmd = ko.asyncCommand({
        execute: function (complete) {
            showErrorMessage(false);
            showSuccessMessage(false);
            datacontext.saveMessage(message)
                .then(function () {
                        showErrorMessage(false);
                        showSuccessMessage(true);
                        resetMessage();
                    })
                .fail(function () {
                        showSuccessMessage(false);
                        showErrorMessage(true);
                    })
                .fin(complete);
        },
        canExecute: function (isExecuting) {
            return !isExecuting && isDirty();
        }
    });    

	return {
		labels: modelData.labels,
		message: message,
		activate: function(){
			message.fullName('');
		},
        showErrorMessage: showErrorMessage,
        showSuccessMessage: showSuccessMessage,
        saveCmd: saveCmd
	};

});