import React, { useRef } from "react";
import { TextBox } from "devextreme-react/text-box";
import { Validator, RequiredRule } from "devextreme-react/validator";
import Button from "devextreme-react/button";
import notify from "devextreme/ui/notify";

export function TextValidator() {
	const textBoxRef = useRef<any | null>(null);
	const validatorRef = useRef<any>(null);

	const handleSubmit = () => {
		const validatorInstance = validatorRef.current?.instance;
		const result = validatorInstance?.validate();

		if (result?.isValid) {
			const value = textBoxRef.current?.instance.option("value");
			notify(`Form berhasil dikirim: ${value}`, "success", 3000);
		} else {
			notify("Field tidak boleh kosong!", "error", 2000);
		}
	};

	return (
		<React.Fragment>
			<div style={{ padding: 20 }}>
			<TextBox
				placeholder="Nama lengkap"
				width={300}
				ref={textBoxRef}
			>
				<Validator ref={validatorRef}>
				    <RequiredRule message="Nama wajib diisi" />
				</Validator>
			</TextBox>

			<div style={{ marginTop: 20 }}>
				<Button text="Submit" type="default" onClick={handleSubmit} />
			</div>
			</div>
		</React.Fragment>
	);
}
