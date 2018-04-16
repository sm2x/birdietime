// Copyright (c) 2018, CCMSI and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bag Drop', {
	refresh: function(frm) {
		
	},
	validate: (frm) => {
		if(frm.doc.member){
			frappe.call({
				method: "frappe.client.get",
				args: {
					doctype: "Members",
					name: frm.doc.member
				},
				callback: function(res){				
					cur_frm.set_value("golfer_name", res.message.golfer_name);
				}
			});
		}
	},
	is_active: (frm) => {		
		if(frm.doc.is_active){
			frm.set_df_property("bd_time_out", "read_only", 1);
			frm.set_value("bd_time_out", "");
		}else{
			frm.set_df_property("bd_time_out", "read_only", 0);
			frm.set_value("bd_time_out", frappe.datetime.now_datetime());
		}
	},
	bag_id: (frm) => {
		if(frm.doc.bag_id){
			frappe.call({
				method: "frappe.client.get",
				args: {
					doctype: "Members Bag",
					name: frm.doc.bag_id
				},
				callback: function(res){				
					cur_frm.set_value("member", res.message.member);
				}
			});
		}
	},
});
