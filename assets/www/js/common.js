/*
 File:          common.js
 Author:        Nick Vincent-Maloney <nicorelllius@gmail.com>
 Date:          2012-0829
 Description:   File for checking if mobile phone is ready.
 Copyright:     This code protected by 2012 Copyright CISTech Consulting <cistechconsulting.com>
                This code protected by 2012 Copyright Matthew Doolittle <mjdoolit@gmail.com>
 History:       <developers: add comments here, under history with name, date and decription>
*/

// Global variable that will tell us whether PhoneGap is ready
var isPhoneGapReady = false;

//Store the current network status
var isConnected = false;
var isHighSpeed = false;

function init() {
	
	// Add event listener for deviceready
	document.addEventListener("deviceready, onDeviceReady, false");
	
	var intervalID = window.setInterval(function() {
		
		if (PhoneGap.available) {
			onDeviceReady();
		}
	}, 500); // Interval check for older Blackberries every 500 miliseconds
}

function onDeviceReady() {
	
	window.clearInterval(intervalID);
	
	// Set to true
	isPhoneGapReady = true;
	
	//alert("The device is now ready.");
	
    // Detect for network access
    networkDetection();
}

function networkDetection() {
    
	if (isPhoneGapReady) {
        
		// as long as the connection type is not none, 
        // the device should have Internet access
        if (navigator.network.connection.type != Connection.NONE) {
            
        	isConnected = true;
        }
        
        // determine if this connection is high speed or not
        switch (navigator.network.connection.type) {
            
        	case Connection.UNKNOWN:
            case Connection.CELL_2G:
                isHighSpeed = false;
                break;
            default:
                isHighSpeed = true;
                break;
        }
    }
}

// Set an onload handler to call the init function
window.onload = init;