import React, { useRef } from "react";
import { Form } from "devextreme-react/form";
import Button from "devextreme-react/button";
import notify from "devextreme/ui/notify";

const initialFormData = {
  name: "",
  email: ""
};

const rules = {
  name: [{ type: "required" as const, message: "Nama wajib diisi" }],
  email: [
    { type: "required" as const, message: "Email wajib diisi" },
    { type: "email" as const, message: "Email tidak valid" }
  ]
};

export function FormValidator() {
  const formRef = useRef<any>(null);
  const formData = useRef({ ...initialFormData });

  const handleSubmit = () => {
    const formInstance = formRef.current?.instance;
    if (formInstance) {
      const result = formInstance.validate();

      if (result.isValid) {
        notify(`Form berhasil dikirim:\nNama: ${formData.current.name}\nEmail: ${formData.current.email}`, "success", 3000);
        // Kirim data ke backend di sini jika perlu
      } else {
        notify("Tolong isi data dengan benar!", "error", 2000);
      }
    }
  };

  return (
    <React.Fragment>
        <div className="p-6 max-w-md">
        <Form
            showValidationSummary={true}
            ref={formRef}
            formData={formData.current}
            items={[
            {
                dataField: "name",
                label: { text: "Nama" },
                validationRules: rules.name,
                
            },
            {
                dataField: "email",
                label: { text: "Email" },
                validationRules: rules.email
            }
            ]}
        />
        <div className="mt-4">
            <Button text="Submit" type="default" onClick={handleSubmit} />
        </div>
        </div>
    </React.Fragment>
  );
}
