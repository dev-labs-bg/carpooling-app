var frameModule = require( 'ui/frame' );
var dialogsModule = require( 'ui/dialogs' );
var userViewModel = require( '../../shared/view-models/user.js' );
var user = new userViewModel();

// This method will be executed when the register page is loaded
module.exports.loaded = function( args ) {
  var page = args.object;
  page.bindingContext = user;
};

// This method will be executed when the Sign up button is clicked
module.exports.signUp = function() {
  if ( user.isValidEmail() ) {
    user.register()
      .then( function() {
        var topmost = frameModule.topmost();
        topmost.navigate( 'views/home/home' );
      } ).catch( function( err ) {
      dialogsModule.alert( {
        message: 'Unfortunately we were not able to register you.', okButtonText: 'OK'
      } );
    } );
  } else {
    dialogsModule.alert( {
      message: 'Enter a valid email address.', okButtonText: 'OK'
    } );
  }
};