// Copyright (c) 2024, Pivot Pie and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Map", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on('Map', {
    map: function(frm){
        console.log(JSON.parse(frm.doc.map));
        let mapdata = JSON.parse(frm.doc.map).features[0];
        if(mapdata && mapdata.geometry.type == 'Point'){
            let lat = mapdata.geometry.coordinates[1];
            let lon = mapdata.geometry.coordinates[0];
            console.log(lat, lon);
            // make an api call with dynamic lat and lon
            frappe.call({
                type: "GET",
                url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
                callback: function(r) {
                    console.log(r);
                    // set doc address
                    // Accessing nested address properties
                    var address = r.address; // Access the address object
                    
                    // Handling the potential interchange of 'town' and 'city'
                    var cityOrTown = address.city || address.town; // This will use 'city' if available, otherwise 'town'

                    frm.set_value('name1', r.name);
                    frm.set_value('road', address.road || ''); // Providing a fallback in case 'road' is undefined
                    frm.set_value('suburb', address.suburb || ''); // Providing a fallback in case 'suburb' is undefined
                    frm.set_value('town', cityOrTown || ''); // Using the variable that holds either 'city' or 'town'
                    frm.set_value('state', address.state || ''); // Providing a fallback in case 'state' is undefined
                    frm.set_value('country', address.country);
                    frm.set_value('display_name', r.display_name);
                }
            })
        }
    }
    // END MAP
});


