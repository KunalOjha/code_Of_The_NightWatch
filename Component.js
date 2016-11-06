sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("pricingTool.Component", {

		metadata : {
            
            metadata : {
                maniest: "json"
            },
			rootView : "pricingTool.view.Main",
			dependencies : {
				libs : [
					"sap.m",
					"sap.ui.layout"
				]
			},
			config : {
				sample : {
					files : [
						"Main.view.xml",
						"Main.controller.js"
					]
				}
			}
		},
        
        init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			// additional initialization can be done here
		}
	});

	return Component;

});
