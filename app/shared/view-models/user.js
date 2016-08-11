var config = require( '../config.js' );
var fetchModule = require( 'fetch' );
var Observable = require( 'data/observable' ).Observable;
var emailValidator = require( 'email-validator' );

/**
 * @param userData
 * @returns {"data/observable".Observable|Observable|*}
 * @constructor
 */
function User( userData ) {
  userData = userData || {};

  var viewModel = new Observable( {
    email:         userData.email || '',
    password:      userData.password || '',
    name:          userData.name || '',
    mobile_number: userData.mobile_number || ''
  } );

  // This is the login method which makes the request to the database
  viewModel.login = function() {
    return fetchModule.fetch( config.apiUrl + '/users/authentication', {
        method:       'POST', body: JSON.stringify( {
          email:      viewModel.get( 'email' ),
          password:   viewModel.get( 'password' ),
          grant_type: 'password'
        } ), headers: {
          'Content-Type': 'application/json'
        }
      } )
      .then( handleErrors )
      .then( function( res ) {
        return res.json();
      } )
      .then( function( data ) {
        config.token = data.token
      } );
  };

  // This is the register method which makes the requests to the database
  viewModel.register = function() {
    return fetchModule.fetch( config.apiUrl + '/users', {
        method:       'POST', body: JSON.stringify( {
          name:          viewModel.get( 'name' ),
          email:         viewModel.get( 'email' ),
          mobile_number: viewModel.get( 'mobile_number' ),
          password:      viewModel.get( 'password' )
        } ), headers: {
          'Content-Type': 'application/json'
        }
      } )
      .then( handleErrors )
      .then( function( res ) {
        return res.json();
      } )
      .then( function( data ) {
        config.token = data.token
      } )
  };

  // This method checks if the given email is valid
  viewModel.isValidEmail = function() {
    var email = this.get( 'email' );
    return emailValidator.validate( email );
  };

  return viewModel;
}

// This method handles errors
function handleErrors( response ) {
  if ( !response.ok ) {
    throw Error( response.statusText );
  }
  return response;
}

module.exports = User;