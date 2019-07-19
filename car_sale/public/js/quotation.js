{% include "car_sale/public/js/car_search.js" %}
{% include "car_sale/public/js/sales_person.js" %}
frappe.ui.form.on('Quotation', {
    on_submit:function(frm) {
        if (cur_frm.doc.reserve_above_items==0) {
            cur_frm.set_df_property("reserve_above_items", "read_only", 1);
        }
	},
	items_on_form_rendered: function() {
		erpnext.setup_serial_no();
	},
	setup:function(frm){

	},
	refresh:function(frm){
		if(cur_frm.doc.docstatus == 1 && cur_frm.doc.status!=='Lost') {
			if(!cur_frm.doc.valid_till || frappe.datetime.get_diff(cur_frm.doc.valid_till, frappe.datetime.get_today()) > 0) {
				cur_frm.add_custom_button(__('Car Sales Order'),
					cur_frm.cscript['Make Sales Order From Quotation'], __("Make"));
			}
		}
	}
});

cur_frm.cscript['Make Sales Order From Quotation'] = function() {
	frappe.model.open_mapped_doc({
		method: "car_sale.api.make_sales_order_from_quotation",
		frm: cur_frm
	})
}