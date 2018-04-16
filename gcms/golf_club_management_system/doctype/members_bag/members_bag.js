// Copyright (c) 2018, CCMSI and contributors
// For license information, please see license.txt

frappe.ui.form.on('Members Bag', {
	refresh: function(frm) {

	},
	validate: (frm) => {
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Members",
				name: frm.doc.member
			},
			callback: function(res){		
				frm.set_value("golfer_name", res.message.golfer_name);				
			}
		});
	}
});
