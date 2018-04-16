try{
	erpnext.pos.PointOfSale = erpnext.pos.PointOfSale.extend({});
}catch(e){
	class PointOfSale extends erpnext.pos.PointOfSale {
		constructor(wrapper){
			super(wrapper);
		}

		make_cart() {
			this.cart = new POSCart({
				frm: this.frm,
				wrapper: this.wrapper.find('.cart-container'),
				events: {
					on_customer_change: (customer) => this.frm.set_value('customer', customer),
					on_field_change: (item_code, field, value) => {
						this.update_item_in_cart(item_code, field, value);
					},
					on_numpad: (value) => {
						if (value == 'Pay') {
							if (!this.payment) {
								this.make_payment_modal();
							} else {
								this.frm.doc.payments.map(p => {
									this.payment.dialog.set_value(p.mode_of_payment, p.amount);
								});

								this.payment.set_title();
							}
							this.payment.open_modal();
						}
					},
					on_select_change: () => {
						this.cart.numpad.set_inactive();
					},
					get_item_details: (item_code) => {
						return this.items.get(item_code);
					},
				}
			});
			this.make_nfc_field_dom();
		}

		make_nfc_field_dom() {
			this.wrapper.find('.pos-cart').prepend('<div class="nfc-field"></div>');
			this.render_nfc_field();
		}

		render_nfc_field() {
			this.nfc_field = frappe.ui.form.make_control({
				df: {
					fieldtype: 'Link',
					label: 'NFC',
					fieldname: 'nfc_data',
					options: 'Daily Players',
					reqd: 1,
					onchange: () => {
						this.fetch_customer_info(this.nfc_field.get_value());
					},
				},
				parent: this.wrapper.find('.nfc-field'),
				render_input: true
			});
		}

		fetch_customer_info(id) {
			var me = this;
			if(id){
				frappe.call({
					method: 'gcms.api.gcms_get_customer',
					args: {
						"id": id
					},
					callback: function(res){
						var cust = res.message;
						me.cart.customer_field.set_value(cust.customer_name);
						me.frm.doc.daycard_id = id;
						//wrap.find('.customer-field').find('input[data-fieldname="customer"]').val(cust.customer_name);
					}
				});
			}
		}
	}
	erpnext.pos.PointOfSale = PointOfSale;
}