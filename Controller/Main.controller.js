sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'sap/m/MessageToast'
	], function(jQuery, Controller, JSONModel, Filter, FilterOperator, MessageToast) {
	"use strict";

	var CController = Controller.extend("pricingTool.controller.Main", {

		onInit : function (oEvent) {
            
			var oModel = new sap.ui.model.json.JSONModel("Model/products.json");
			this.getView().setModel(oModel);
			var v1 = this.byId("gridThing");
			console.log(v1);
			v1.setVisible(false);
		},
        
        //Filtering function for NSN Search Query
        onFilterNSN : function (oEvent) {
			 // build filter array
			var aFilter = [], 
                oButton = this.byId("nsnButton"),
                oInput = this.byId("nsnSearch"),
                oTable = this.getView().byId("idProductsTable"),
                v1 = this.byId("gridThing"),
                oHeader = this.byId("nsnOutput"),
				oBinding = oTable.getBinding("items"),
                sQuery = oInput.getValue(),
                iQueryLength = this.byId("nsnSearch").getValue().length;
                var filteredString;
            
			if (sQuery) {
                 
                sQuery = sQuery.replace(/-/g, "");

                if (sQuery.length !== 9) {
                    sQuery = nsnToNIIN(sQuery);
                }            
                
                function nsnToNIIN(userInput) {               
                    var maxLengthZeros = "000000000",
                        nsnLength;
                    
                    nsnLength = (maxLengthZeros + userInput).slice(-9);
                    return nsnLength;
                }
                                
				aFilter.push(new Filter("NIIN", FilterOperator.EQ, sQuery));
			};
            
            if (aFilter == [] || iQueryLength == 0) {
                
                oTable.setVisible(false);
                MessageToast.show("Required Field");
                oInput.setValueState("Error");
                oButton.setEnabled(false);
                oHeader.setTitle("NSN/NIIN:")
            }
            
            //TO DO: Have a condition that checks if filter is empty, no results = messageToast commented below
             
            else {
                // apply filter. an empty filter array simply removes the filter
                var check = oBinding.getLength();
                console.log(check);
                oBinding.filter(aFilter);
                oTable.setVisible(true);
                v1.setVisible(false);
                oInput.setValueState("None");
                oButton.setEnabled(false);  
                oHeader.setTitle("NSN/NIIN: 	"+ sQuery);
                var check = oBinding.getLength();
                console.log(check);
                
                if (check === 0) {
                     MessageToast.show("0 Records Found");
                   // oInput.setValueState("Warning");
                }
            }
        },
                
        onNsnChange : function() {
             var oInput = this.byId("nsnSearch"),
                 oButton = this.byId("nsnButton");
            
             oInput.setValueState("None");
			 oButton.setEnabled(true);       
        },
             
		onPricePress : function (evt) {
			var v1 = this.byId("gridThing");
            var t1 = this.byId("idProductsTable");
			console.log(v1);
            console.log(t1)
            if (t1.getVisible()) {
                t1.setVisible(false);
                v1.setVisible(true);
            } else {
                MessageToast.show("Nothing to evaluate, please try again");
            }
			
		},

        onClear : function(evt) {
            var v1 = this.byId("gridThing"),
                 oTable = this.byId("idProductsTable"),
                 oInput = this.byId("nsnSearch"),
                 oButton = this.byId("nsnButton"),
                 oHeader = this.byId("nsnOutput");
            
            oInput.setValue("");
            oInput.setValueState("None");
            oButton.setEnabled(true);
            oHeader.setTitle("NSN/NIIN:")
            oTable.setVisible(false);
            v1.setVisible(false);
        },
        onPDFMaker : function(){
				//var data = this.byId("stuff");
				//var oInput = this.byId("nsnSearch");
				var oInput = this.byId("nsnSearch"),
                	oTable = this.getView().byId("idProductsTable"),
                	oHeader = this.byId("nsnOutput"),
					oBinding = oTable.getBinding("items"),
                	sQuery = oInput.getValue(),
                	iQueryLength = this.byId("nsnSearch").getValue().length;

				var nsnLabel = this.byId("nsnLabel"),
					PAWQLabel = this.byId("PAWQ"),
					awardQInput = this.byId("awardQuantity"),
					PUPLabel = this.byId("PUPid"),
					PUPInput = this.byId("unitPrice"),
					buyQuantityLabel = this.byId("CBQLabel"),
					buyQuatityInput = this.byId("buyQuantity"),
					proposedPriceLabel = this.byId("PUPLabel"),
					proposedPriceInput = this.byId("price"),
					LCLabel = this.byId("LearningCurveLabel"),
					LCInput = this.byId("learningCurve"),
					awardDateLabel = this.byId("PADlabel"),
					awardDateInput = this.byId("awardDate"),
					listItem1 = this.byId("value1"), listItem2 = this.byId("value2"), listItem3 = this.byId("value3"),
					listItem4 = this.byId("value4"), listItem5 = this.byId("value5"), listItem6 = this.byId("value6"),
					listItem7 = this.byId("value7"), listItem8 = this.byId("value8"), listItem9 = this.byId("value9"),
					listItem10 = this.byId("value10"), listItem11 = this.byId("value11"), listItem12 = this.byId("value12"),
					listItem13 = this.byId("value13"), listItem14 = this.byId("value14"), listItem15 = this.byId("value15"),
					listItem16 = this.byId("value16"), listItem17 = this.byId("value17"), listItem18 = this.byId("value18"),
					listItem19 = this.byId("value19"), listItem20 = this.byId("value20"), listItem21 = this.byId("value21"), 
					listItem22 = this.byId("value22"), listItem23 = this.byId("value23"), listItem24 = this.byId("value24"),
					listItem25 = this.byId("value25"), listItem26 = this.byId("value26"), listItem27 = this.byId("value27");


				var docDefinition = {

            		content: [
						{columns: [
                    		{
                    			width:180,
                    			text: nsnLabel.getText() + '\n'+ PAWQLabel.getText() + '\n'+ PUPLabel.getText() + '\n'+ buyQuantityLabel.getText() +
                    			proposedPriceLabel.getText() + '\n'+ LCLabel.getText() + '\n'+ awardDateLabel.getText(), style: 'leftStyle'},
                    		{	width: 80,
                    			text: oInput.getValue() + '\n' + awardQInput.getValue() +'\n$' + PUPInput.getValue() +'\n' +  buyQuatityInput.getValue() +
                    			'\n$' + proposedPriceInput.getValue() + '\n' + LCInput.getValue() + '\n' + awardDateInput.getValue(), style: 'rightStyle'
                    		},
                    		]
                    	},
						'\n\n',
                    	
                    	{table:{
                    			widths:[150, 150, 150],
                    			body:[
                    				[{text: listItem1.getTitle(), style: 'centerStyle' }, { text: listItem2.getTitle(), style: 'centerStyle' }, {text: listItem3.getTitle(), style: 'centerStyle' }],
                    				[{text: listItem1.getDescription(), style: 'centerStyle2' }, { text: listItem2.getDescription(), style: 'centerStyle2'}, { text: listItem3.getDescription(), style: 'centerStyle2'}]
                    			]
                    		} 
                    	},
                    	'\n',
                    	{table:{
                    			widths:[150, 150, 150],
                    			body:[
                    				[{text: listItem4.getTitle(), style: 'centerStyle' }, {text: listItem5.getTitle(), style: 'centerStyle' }, {text: listItem6.getTitle(), style: 'centerStyle' }],
                    				[{text: listItem4.getDescription(), style: 'centerStyle2'}, { text:listItem5.getDescription(), style: 'centerStyle2'}, { text: listItem6.getDescription(), style: 'centerStyle2'}]
                    			]
                    		} 
                    	},
                    	'\n',
                    	{table:{
                    			widths:[150, 150, 150],
                    			body:[
                    				[{text: listItem7.getTitle(), style: 'centerStyle' }, {text: listItem8.getTitle(), style: 'centerStyle' }, {text: listItem9.getTitle(), style: 'centerStyle' }],
                    				[{ text: listItem7.getDescription(), style: 'centerStyle2'}, { text: listItem8.getDescription(), style: 'centerStyle2'}, { text: listItem9.getDescription(), style: 'centerStyle2'}]
                    			]
                    		} 
                    	},
                    	'\n',
                    	{table:{
                    			widths:[150, 150, 150],
                    			body:[
                    				[{text: listItem10.getTitle(), style: 'centerStyle' }, {text: listItem11.getTitle() , style: 'centerStyle' }, {text: listItem12.getTitle(), style: 'centerStyle' }],
                    				[{text: listItem10.getDescription(), style: 'centerStyle2'}, { text: listItem11.getDescription(), style: 'centerStyle2'}, { text: listItem12.getDescription(), style: 'centerStyle2'}]
                    			]
                    		} 
                    	},
                    	'\n',
                    	{table:{
                    			widths:[150, 150, 150],
                    			body:[
                    				[{text: listItem13.getTitle(), style: 'centerStyle' }, {text: listItem14.getTitle(), style: 'centerStyle' }, {text: listItem15.getTitle(), style: 'centerStyle' }],
                    				[{text: listItem13.getDescription(), style: 'centerStyle2'}, { text:listItem14.getDescription(), style: 'centerStyle2'}, { text: listItem15.getDescription(), style: 'centerStyle2'}]
                    			]
                    		} 
                    	},
                    	'\n',
                    	{table:{
                    			widths:[150, 150, 150],
                    			body:[
                    				[{text: listItem16.getTitle(), style: 'centerStyle' }, {text: listItem17.getTitle(), style: 'centerStyle' }, {text: listItem18.getTitle(), style: 'centerStyle' }],
                    				[{ text: listItem16.getDescription(), style: 'centerStyle2'}, { text: listItem17.getDescription(), style: 'centerStyle2'}, {text: listItem18.getDescription(), style: 'centerStyle2'}]
                    			]
                    		} 
                    	},
                    	'\n',
                    	{table:{
                    			widths:[150, 150, 150],
                    			body:[
                    				[{text: listItem19.getTitle(), style: 'centerStyle' }, {text: listItem20.getTitle() , style: 'centerStyle' }, {text: listItem21.getTitle(), style: 'centerStyle' }],
                    				[{text: listItem19.getDescription(), style: 'centerStyle2'}, { text: listItem20.getDescription(), style: 'centerStyle2'}, { text: listItem21.getDescription(), style: 'centerStyle2'}]
                    			]
                    		} 
                    	},
                    	'\n',
                    	{table:{
                    			widths:[150, 150, 150],
                    			body:[
                    				[{text: listItem22.getTitle(), style: 'centerStyle' }, {text: listItem23.getTitle(), style: 'centerStyle' }, {text: listItem24.getTitle(), style: 'centerStyle' }],
                    				[{text: listItem22.getDescription(), style: 'centerStyle2'}, { text:listItem23.getDescription(), style: 'centerStyle2'}, { text: listItem24.getDescription(), style: 'centerStyle2'}]
                    			]
                    		} 
                    	},
                    	'\n',
                    	{table:{
                    			widths:[150, 150, 150],
                    			body:[
                    				[{text: listItem25.getTitle(), style: 'centerStyle' }, {text: listItem26.getTitle(), style: 'centerStyle' }, {text: listItem27.getTitle(), style: 'centerStyle' }],
                    				[{text: listItem25.getDescription(), style: 'centerStyle2'}, { text: listItem26.getDescription(), style: 'centerStyle2'}, {text: listItem27.getDescription(), style: 'centerStyle2'}]
                    			]
                    		} 
                    	},
                    	
                    	
                    	],

                    	styles:{
                    		NSNStyle:{
                    			fontsize: 18,
                    			bold: true
                    		},
                    		centerStyle:{
                    			fontsize: 18,
                    			bold: true,
                    			alignment: "center"	
                    		},
                    		centerStyle2:{
                    			fontsize: 15,
                    			alignment: "center"	
                    		},
                    		rightStyle:{
                    			fontsize: 15,
                    			alignment: "right"	
                    		},
                    		leftStyle:{
                    			bold: true,
                    			fontsize: 15,
                    			alignment: "left"	
                    		}
                    	}
                    }             
                    pdfMake.createPdf(docDefinition).open();
			}
	});

	return CController;

});