{% include "car_sale/public/js/car_search.js" %}
frappe.ui.form.on('Sales Order', {
	    sales_partner: function(frm) {
		if (cur_frm.doc.sales_partner) {
			frappe.call({
				method: "car_sale.api.get_branch_of_sales_partner",
				args: {
					'sales_partner': cur_frm.doc.sales_partner
				},
				callback: function(r) {
					if(r.message) {
						cur_frm.set_value('sales_partner_branch',r.message);
						cur_frm.refresh_fields('sales_partner_branch');
					}
				}
			})
			
		}else{
			cur_frm.set_value('sales_partner_branch','');
			cur_frm.refresh_fields('sales_partner_branch');	
		}

	},
	items_on_form_rendered: function() {
			erpnext.setup_serial_no();
	},
	
	
});
// frappe.ui.form.on('Sales Order Item', {
// 	serial_no:function(frm){
// 		console.log('inside')
// 	}

// });