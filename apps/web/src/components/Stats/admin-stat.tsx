import { Card, Group, Text, SimpleGrid, rem } from "@mantine/core"
import { IconCoin } from "@tabler/icons-react"
import { Store } from "lucide-react"

interface StatsCardProps {
	title: string
	icon: React.ReactNode
	previousMonth: number
	currentMonth: number
	iconColor: string
}

function StatsCard({ title, icon, previousMonth, currentMonth, iconColor }: StatsCardProps) {
	return (
		<Card
			withBorder
			radius="md"
			p="xl"
		>
			<Group align="flex-start">
				<div>
					<Text fz="lg" fw={500} mb="xl">
						{title}
					</Text>
					<Group gap="xs">
						<Text c="dimmed" fz="sm">
							Tháng trước:
						</Text>
						<Text fz="sm" fw={500}>
							{previousMonth} Cửa hàng
						</Text>
					</Group>
					<Group gap="xs" mt="xs">
						<Text c="dimmed" fz="sm">
							Tháng này:
						</Text>
						<Text fz="sm" fw={500}>
							{currentMonth} Cửa hàng
						</Text>
					</Group>
				</div>
				<div
					style={{
						backgroundColor: iconColor,
						width: rem(48),
						height: rem(48),
						borderRadius: "50%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						opacity: 0.85,
					}}
				>
					{icon}
				</div>
			</Group>
		</Card>
	)
}

export default function AdminStat() {
	return (
		<SimpleGrid cols={2} spacing="lg">
			<StatsCard
				title="Tổng số cửa hàng"
				icon={<Store size={24} color="white" />}
				previousMonth={0}
				currentMonth={0}
				iconColor="#00B894"
			/>
			<StatsCard
				title="Tình trạng thanh toán"
				icon={<IconCoin size={24} color="white" />}
				previousMonth={0}
				currentMonth={0}
				iconColor="#FFC107"
			/>
		</SimpleGrid>
	)
}

