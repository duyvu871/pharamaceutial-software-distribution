import { DoctorCreationSchema, DoctorSchema } from '@schema/doctor-schema.ts';
import DoctorCreationForm from '@component/Form/doctor-form.tsx';
import { Tabs } from '@mantine/core';
import DoctorPrescriptionDetail from '@component/Detail/doctor-prescription-detail.tsx';

type DoctorDetailProps<Schema extends DoctorSchema> = {
	detail?: Schema | null;
	submit?: (doctor: DoctorCreationSchema) => void;
}

export default function DoctorDetail<Schema extends DoctorSchema>({detail, submit}: DoctorDetailProps<Schema>) {

	console.log('detail', detail);

	return (
		<Tabs defaultValue="doctor-detail" color={"var(--main-color)"}>
			<Tabs.List>
				<Tabs.Tab value="doctor-detail" >
					Thông tin bác sĩ
				</Tabs.Tab>
				{
					detail && (
						<Tabs.Tab value="prescription-history">
							Lịch sử kê đơn
						</Tabs.Tab>
					)
				}
			</Tabs.List>

			<Tabs.Panel value="doctor-detail">
				<DoctorCreationForm data={detail || undefined} submit={submit} />
			</Tabs.Panel>

			{
				detail && (
					<Tabs.Panel value="prescription-history">
						<DoctorPrescriptionDetail prescriptions={detail.invoice_prescriptions} />
					</Tabs.Panel>
				)
			}
		</Tabs>
	)
}