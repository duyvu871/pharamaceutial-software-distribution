import { DoctorCreationSchema, DoctorSchema } from '@schema/doctor-schema.ts';
import DoctorCreationForm from '@component/Form/doctor-form.tsx';
import { Tabs } from '@mantine/core';

type DoctorDetailProps = {
	detail?: DoctorSchema | null;
	submit?: (doctor: DoctorCreationSchema) => void;
}

export default function DoctorDetail({detail, submit}: DoctorDetailProps) {
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
						<div>
							Chưa có dữ liệu
						</div>
					</Tabs.Panel>
				)
			}
		</Tabs>
	)
}