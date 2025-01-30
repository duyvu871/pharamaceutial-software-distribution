/**
 * FormBuilder - Component xây dựng form động với react-hook-form và Mantine UI
 * Hỗ trợ:
 * - Tự động validation với Zod schema
 * - Tích hợp sẵn các loại field phổ biến
 * - Custom component và form instance từ bên ngoài
 * - Responsive grid layout
 */

import {
	Button,
	Group,
	Select,
	TextInput,
	Grid,
	GridCol,
	PasswordInput,
	Radio,
	Checkbox,
	Stack,
	MantineColor,
	MantineSpacing,
    InputProps,
} from "@mantine/core";
import {
	useForm,
	Controller,
	SubmitHandler,
	Path,
	UseFormReturn,
	Mode,
	FieldValues,
} from "react-hook-form";
import { ComponentType, ReactElement, useEffect, useMemo, cloneElement } from "react";
import { z, ZodSchema, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerInput } from "@mantine/dates";
import isEqual from "lodash.isequal"

// ==================== TYPE DEFINITIONS ====================
/** Kiểu dữ liệu cho các loại field được hỗ trợ */
export type FormFieldType =
	| "text"
	| "select"
	| "date"
	| "password"
	| "email"
	| "tel"
	| "radio"
	| "custom"
	| "checkbox"
	| "checkbox-group";

const defaultFieldProps = {
	autoCapitalize:"off",
	autoComplete:"off",
	autoCorrect:"off",
	spellCheck: false,
}

/** Cấu hình cho từng field trong form */
export type FormField<T extends ZodSchema> = InputProps & {
	type: FormFieldType;
	name: Path<TypeOf<T>>;
	label?: string;
	defaultValue?: any;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	options?: Array<{ value: string; label: string }>;
	component?: ComponentType<any>;
	colSpan?: number;
	customProps?: Record<string, unknown>;
	wrapperStyle?: React.CSSProperties;
	autoComplete?: string;
};

/** Props cho component FormBuilder */
export type FormBuilderProps<T extends ZodSchema> = {
	/** Danh sách các field trong form */
	fields: FormField<T>[];
	/** Zod schema cho validation (optional nếu dùng form bên ngoài) */
	schema?: T;
	/** Callback khi submit form */
	onSubmit: SubmitHandler<TypeOf<T>>;
	/** Callback khi cancel form */
	onCancel?: () => void;
	/** Giá trị mặc định của form */
	defaultValues?: Partial<TypeOf<T>>;
	/** Text nút submit */
	submitText?: string;
	/** Text nút cancel */
	cancelText?: string;
	/** Layout các field */
	layout?: "horizontal" | "vertical";
	/** Khoảng cách giữa các field */
	spacing?: string;
	/** Khoảng cách grid gutter */
	gridGutter?: number;
	/** Custom components cho loại field 'custom' */
	customComponents?: Record<string, ComponentType<any>>;
	/** Custom action buttons */
	actions?: ReactElement[];
	/** Màu sắc chủ đạo */
	color?: MantineColor;
	/** Khoảng cách giữa các phần tử */
	gap?: MantineSpacing;
	/** Chế độ validation của react-hook-form */
	mode?: Mode;
	/** Form instance từ bên ngoài */
	form?: UseFormReturn<TypeOf<T>>;
};

// ==================== MAIN COMPONENT ====================
export const FormBuilder = <T extends ZodSchema>({
																									 fields,
																									 schema,
																									 onSubmit,
																									 onCancel,
																									 defaultValues,
																									 submitText = "Submit",
																									 cancelText = "Cancel",
																									 layout = "vertical",
																									 spacing = "md",
																									 gridGutter = 20,
																									 customComponents,
																									 actions,
																									 color,
																									 gap,
																									 mode,
																									 form: externalForm,
																								 }: FormBuilderProps<T>) => {
	type FormValues = TypeOf<T>;

	// Merge default values từ props và từng field
	const mergedDefaultValues = useMemo(() => {
		const fieldDefaults = fields.reduce((acc, field) => {
			if (field.defaultValue !== undefined) {
				acc[field.name as keyof FormValues] = field.defaultValue;
			}
			return acc;
		}, {} as Partial<FormValues>);

		return { ...fieldDefaults, ...defaultValues };
	}, [fields, defaultValues]);

	// Khởi tạo form nội bộ nếu không có form từ bên ngoài
	const internalForm = useForm<FormValues>({
		resolver: schema ? zodResolver(schema) : undefined,
		mode: mode || "onSubmit",
		defaultValues: mergedDefaultValues as any,
	});

	// Ưu tiên sử dụng form từ bên ngoài
	const { control, handleSubmit, formState: { errors }, setValue, reset, getValues } =
	externalForm || internalForm;

	// Reset form khi default values thay đổi
	useEffect(() => {
		if (mergedDefaultValues && !isEqual(mergedDefaultValues, getValues())) {
			reset(mergedDefaultValues as any);
		}
	}, [mergedDefaultValues, reset, getValues]);

	// ==================== FIELD RENDERER ====================
	/** Render UI cho từng loại field */
	const renderField = (field: FormField<T>): ReactElement => {
		const commonProps = {
			label: field.label,
			placeholder: field.placeholder,
			required: field.required,
			disabled: field.disabled,
			error: errors[field.name]?.message as string,
			style: field.wrapperStyle,
			...field.customProps,
		};

		/** Xác định container cho các field group */
		const getOrientationContainer = (
			orientation: "horizontal" | "vertical" = "horizontal"
		) => {
			return orientation === "vertical" ? Stack : Group;
		};

		switch (field.type) {
			case "select":
				return <Select data={field.options || []} {...commonProps} />;
			case "date":
				return <DatePickerInput {...commonProps} valueFormat="DD/MM/YYYY" />;
			case "custom": {
				const CustomComponent = customComponents?.[field.name];
				return CustomComponent ? (
					<CustomComponent {...commonProps} />
				) : (
					<TextInput error="Missing custom component" />
				);
			}
			case "password":
				return <PasswordInput
					{...defaultFieldProps}
					{...commonProps}
				/>;
			case "radio": {
				const orientation = (field.customProps?.orientation as
					| "horizontal"
					| "vertical") || "horizontal";
				const Container = getOrientationContainer(orientation);
				return (
					<Radio.Group {...commonProps}>
						<Container mt="xs" gap={gap}>
							{field.options?.map((option) => (
								<Radio
									key={option.value}
									value={option.value}
									label={option.label}
									disabled={commonProps.disabled}
								/>
							))}
						</Container>
					</Radio.Group>
				);
			}
			case "checkbox":
				return (
					<Checkbox
						{...commonProps}
						labelPosition="right"
						defaultChecked={field.defaultValue}
					/>
				);
			case "checkbox-group": {
				const orientation = (field.customProps?.orientation as
					| "horizontal"
					| "vertical") || "horizontal";
				const Container = getOrientationContainer(orientation);
				return (
					<Checkbox.Group {...commonProps}>
						<Container mt="xs" gap={orientation === "vertical" ? "xs" : undefined}>
							{field.options?.map((option) => (
								<Checkbox
									key={option.value}
									value={option.value}
									label={option.label}
									disabled={commonProps.disabled}
								/>
							))}
						</Container>
					</Checkbox.Group>
				);
			}
			default:
				return <TextInput
					type={field.type}
					{...defaultFieldProps}
					{...commonProps}
				/>;
		}
	};

	// ==================== MAIN RENDER ====================
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid gutter={gridGutter}>
				{fields.map((field) => (
					<GridCol key={field.name as string} span={field.colSpan}>
						<Controller<FormValues>
							name={field.name}
							control={control}
							render={({ field: controllerField, fieldState }) => {
								const element = renderField(field);
								return cloneElement(element, {
									...controllerField,
									value: controllerField.value ?? "",
									error: fieldState.error?.message || element.props.error,
								});
							}}
						/>
					</GridCol>
				))}
			</Grid>

			<Group mt={spacing} justify="flex-end">
				{actions || (
					<>
						{onCancel && (
							<Button variant="outline" onClick={onCancel} color={color}>
								{cancelText}
							</Button>
						)}
						<Button type="submit" color={color}>
							{submitText}
						</Button>
					</>
				)}
			</Group>
		</form>
	);
};

// ==================== USAGE EXAMPLES ====================
/**
 * Cách sử dụng cơ bản:
 *
 * const schema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8)
 * });
 *
 * <FormBuilder
 *   schema={schema}
 *   fields={[
 *     { type: "email", name: "email", label: "Email" },
 *     { type: "password", name: "password", label: "Password" }
 *   ]}
 *   onSubmit={(data) => console.log(data)}
 * />
 *
 * Sử dụng với form instance từ bên ngoài:
 *
 * const form = useForm({...});
 * <FormBuilder
 *   form={form}
 *   fields={[...]}
 *   onSubmit={...}
 * />
 *
 * Custom component:
 *
 * const MyCustomField = (props) => (...);
 *
 * <FormBuilder
 *   customComponents={{ 'fieldName': MyCustomField }}
 *   fields={[{ type: "custom", name: "fieldName", ... }]}
 *   ...
 * />
 */