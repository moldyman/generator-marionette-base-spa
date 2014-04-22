define([ 
        'underscore', 
        'jquery', 
        'backbone', 
        'marionette',
        // 'config/regions/dialog',
        'json!global/modules.json'
    ],

    function( _, $, Backbone, Marionette, DialogRegion, modulesList ) {
        'use strict';

        _.extend( Marionette.Application.prototype, {
            /**
             * Navigate method. Handles Backbone.history.navigate behavior
             * @param {string} route
             * @param [{object}] options
             */
            navigate: function( route, options ) {
                options || (options = {});
                Backbone.history.navigate( route, options );
            },
            /**
             * Returns current route fragment
             * @return {string}
             */
            getCurrentRoute: function() {
                return Backbone.history.fragment;
            }

        });

        var App = new Marionette.Application();
        
        // Specify the application region
        App.addRegions({
            headerRegion: '#header-region', // Banner area, where menu, search and utitlities will live 
            mainRegion: '#main-region', // Main Application Layout Region
            // dialogRegion: DialogRegion.extend({
            //     el: '#dialog-region' // Application Dialog Region
            // })    
        });

        // Initializer Handler
        App.on('initialize:after', function(){
            console.log('moo');
            
            // Pulls in the list of modules dynamically from JSON, as filtered by permissions
            var modulesArray = [];

            _.each(modulesList, function(module){
                modulesArray.push(module.path);
            });

            require(modulesArray, function(){
                // Kick off Backbone.history to resolve current url
                Backbone.history.start({ pushState: true, root: '/' });
            }); 
        });

        return App;
    }
);