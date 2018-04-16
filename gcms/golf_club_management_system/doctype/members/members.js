// Copyright (c) 2018, CCMSI and contributors
// For license information, please see license.txt

frappe.ui.form.on('Members', {
	refresh: function(frm) {
		if(frm.doc.golfer_profile){
			frappe.call({
				method: "frappe.client.get",
				args: {
					doctype: "Golfer Profile",
					name: frm.doc.golfer_profile
				},
				callback: function(res){	
					frm.set_value("photo", res.message.photo);							
				}
			});
		}
		frm.set_df_property("bag_ids", "hidden", frm.doc.__islocal?1:0);
	},
	onload_post_render: function(frm){
		
	},
	golfer_profile: function(frm){
		if(frm.doc.golfer_profile){
			frappe.call({
				method: "frappe.client.get",
				args: {
					doctype: "Golfer Profile",
					name: frm.doc.golfer_profile
				},
				callback: function(res){				
					cur_frm.set_value("player_class", res.message.player_class);
					cur_frm.set_value("golfer_name", res.message.fullname);
				}
			});
		}
	},
});

frappe.ui.form.on("Members Bag", "bag_ids_add", function(frm, cdt, cdn){
	var row = locals[cdt][cdn];
	row.member = frm.doc.name;
	console.log(frm.doc.name);
});