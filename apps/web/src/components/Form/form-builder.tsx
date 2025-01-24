import {
	Button,
	Group,
	Select,
	TextInput,
	Grid,
	GridCol,
	ActionIcon,
	PasswordInput,
	Radio,
	Checkbox,
	Stack,
	MantineColor,
    MantineSpacing,
} from "@mantine/core";
import {
	useForm,
	Controller,
	SubmitHandler,
	Path,
	ControllerRenderProps,
    Mode,
} from "react-hook-form";
import {
	ComponentType,
	ReactElement,
	useEffect,
	forwardRef,
	useState,
	cloneElement,
} from "react";
import { z, ZodSchema, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";

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

export type FormField<T extends ZodSchema> = {
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
};

export type FormBuilderProps<T extends ZodSchema> = {
	fields: FormField<T>[];
	schema: T;
	onSubmit: SubmitHandler<TypeOf<T>>;
	onCancel?: () => void;
	defaultValues?: Partial<TypeOf<T>>;
	submitText?: string;
	cancelText?: string;
	layout?: "horizontal" | "vertical";
	spacing?: string;
	gridGutter?: number;
	customComponents?: Record<string, ComponentType<any>>;
	actions?: ReactElement[];
	color?: MantineColor;
	gap?: MantineSpacing;
	mode?: Mode;
};

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
																								 }: FormBuilderProps<T>) => {
	type FormValues = TypeOf<T>;

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		mode: mode || "onSubmit",
		defaultValues: defaultValues as any,
	});

	useEffect(() => {
		// Set default value từ từng field
		fields.forEach((field) => {
			if (field.defaultValue !== undefined) {
				setValue(field.name as any, field.defaultValue);
			}
		});

		// Ghi đè bằng defaultValues nếu có
		if (defaultValues) {
			(Object.entries(defaultValues) as [keyof FormValues, any][]).forEach(
				([key, value]) => {
					// @ts-ignore
					setValue(key, value);
				}
			);
		}
	}, [defaultValues, setValue, fields]);

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
				return <PasswordInput {...commonProps} />;
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
				return <TextInput type={field.type} {...commonProps} />;
		}
	};

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