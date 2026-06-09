import frappe


def create_fields():
    fields = [
        {
            "dt": "Event",
            "fieldname": "custom_meeting_type",
            "label": "Meeting Type",
            "fieldtype": "Select",
            "options": "\nOnline\nOffline\nOther",
            "insert_after": "custom_section_break_ni5nf",
        },
        {
            "dt": "Event",
            "fieldname": "custom_meeting_note",
            "label": "Note",
            "fieldtype": "Small Text",
            "insert_after": "custom_meeting_type",
        },
        {
            "dt": "Event",
            "fieldname": "custom_mobile_no",
            "label": "Mobile No",
            "fieldtype": "Data",
            "options": "Phone",
            "insert_after": "custom_meeting_note",
        },
    ]

    for f in fields:
        dt = f.pop("dt")
        if frappe.db.exists("Custom Field", {"dt": dt, "fieldname": f["fieldname"]}):
            print(f"  already exists: {dt}.{f['fieldname']}")
            continue
        cf = frappe.get_doc({"doctype": "Custom Field", "dt": dt, **f})
        cf.insert(ignore_permissions=True)
        print(f"  created: {dt}.{f['fieldname']}")

    frappe.db.commit()
    print("Done.")
