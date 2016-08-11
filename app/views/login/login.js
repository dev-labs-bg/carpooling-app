var frameModule = require( 'ui/frame' );
var dialogsModule = require( 'ui/dialogs' );
var userViewModel = require( '../../shared/view-models/user.js' );
var user = new userViewModel();

// This method will be executed when the login page is loaded
module.exports.loaded = function( args ) {
  var page = args.object;
  page.bindingContext = user;
};

// This method will be executed when the Sign in button is clicked
module.exports.signIn = function() {
  user.login()
    .then( function() {
      var topmost = frameModule.topmost();
      topmost.navigate( 'views/home/home' );
    } ).catch( function( err ) {
    dialogsModule.alert( {
      message: 'Unfortunately we could not find your account.', okButtonText: 'OK'
    } );
    return Promise.reject;
  } );
};

// This method is used to navigate to the register view
module.exports.signUp = function() {
  var topmost = frameModule.topmost();
  topmost.navigate( 'views/register/register' );
};