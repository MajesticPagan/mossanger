"use client";

import ReactSelect from "react-select";

interface SelectProps {
	label: string;
	disabled?: boolean;
	options: Record<string, any>[];
	value?: Record<string, any>;
	required?: boolean;
	onChange: (value: Record<string, any>) => void;
}

const Select: React.FC<SelectProps> = ({ label, disabled, options, value, required, onChange }) => {
	return (
		<div className="z-[100]">
			<label className="block text-sm font-medium leading-6 text-gray-900">
				{label}
				{required && <span className="text-rose-500 ml-1">*</span>}
			</label>
			<div className="mt-2">
				<ReactSelect
					placeholder="Selecionar..."
					isDisabled={disabled}
					value={value}
					onChange={onChange}
					options={options}
					menuPortalTarget={document.body}
					styles={{
						menuPortal: (base) => ({
							...base,
							zIndex: 9999,
						}),
					}}
					classNames={{ control: () => "text-sm" }}
					required={required}
					isMulti
				/>
			</div>
		</div>
	);
};

export default Select;
