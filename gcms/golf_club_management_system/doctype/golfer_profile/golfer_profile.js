// Copyright (c) 2018, CCMSI and contributors
// For license information, please see license.txt

frappe.ui.form.on('Golfer Profile', {
	refresh: function(frm) {
		if(!frm.doc.__islocal){
			wCam.renderTakeImageButton();
		}
	},
	validate: function(frm){
		if(frm.doc.title)
			frm.doc.fullname = frm.doc.title + " ";
		
		if(frm.doc.firstname)
			frm.doc.fullname += frm.doc.firstname		

		if(frm.doc.middlename)
			frm.doc.fullname += " " + frm.doc.middlename;

		if(frm.doc.lastname)
			frm.doc.fullname += " " + frm.doc.lastname

		if(frm.doc.suffix_name)
			frm.doc.fullname += ", " + frm.doc.suffix_name;
	},
	marital_status: function(frm){
		frm.set_df_property("spouse", "hidden", frm.doc.marital_status != "Married");
	},
});

var wCam = {
	renderTakeImageButton: () => {
		cur_frm.add_custom_button(__("Take Image"), function(){			
			const capture = new frappe.ui.Capture();
			capture.open();

			capture.click((data) => {
				wCam.captureImage(data);
			});
		});
	},
	captureImage: (data) => {
		var message = "<div class='text-center'>" 
		+ "<img src=" + data + "/>"
		+ "<br/><label>Copy and Paste this for upload of Image:</label>"
		+ "<br/><input type='text' class='form-control' value=" + data + ">"
		+ "</div>";
		frappe.msgprint(message, 'Captured Image');
	}
};