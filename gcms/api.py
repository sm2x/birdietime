import frappe
from frappe import _

@frappe.whitelist()
def gcms_get_customer(id):	
	return get_customer(id)

@frappe.whitelist()
def gcms_get_daycard_invoices(daycard, date):
	return get_invoices_items(daycard, date)

@frappe.whitelist()
def gcms_get_si_items(daycard, date):
	target = frappe.new_doc("Sales Invoice")
	customer = get_customer(daycard)

	invoices = get_invoices_items(daycard, date)
	invoices_name = []
	invoices_items = []

	target.customer = customer.name
	target.daycard_id = daycard

	for invoice in invoices:
		invoices_name.append(invoice.name)

	if(len(invoices_name) > 0):
		for x in range(len(invoices_name)):
			si_items = frappe.get_list("Sales Invoice Item",
				filters={'parent': invoices_name[x]},
				fields=["item_code","qty", "rate", "amount"])

			for i in range(len(si_items)):
				target.append('items', {
					'item_code': si_items[i].item_code,
					'qty': si_items[i].qty,
					'rate': si_items[i].rate,
					'amount': si_items[i].amount
				})

	target.run_method("set_missing_values")
	return target

def get_invoices_items(daycard, date):
	new_date = frappe.utils.data.getdate(date)
	invoices = frappe.get_list("Sales Invoice",
		filters={'daycard_id': daycard, 'posting_date': new_date},
		fields=['name', 'posting_date', 'daycard_id', 'total'])

	return invoices

def get_customer(id):
	daily_player = frappe.get_doc("Daily Players", id)
	member = frappe.get_doc("Members", daily_player.member)
	customer = frappe.get_doc("Customer", member.customer_id)
	return customer