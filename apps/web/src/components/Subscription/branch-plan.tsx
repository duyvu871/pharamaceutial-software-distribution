"use client";

import React, { useState, useEffect } from 'react';
import { Subscription } from '@schema/subscription-schema.ts';
import { getBranchSubscription } from '@api/subscription.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';

function BranchPlan() {
	const { branchId } = useDashboard();
	const [subscription, setSubscription] = useState<Subscription | null>(null);

	useEffect(() => {
		getBranchSubscription(branchId)
			.then((data) => {
				setSubscription(data[0]);
			});
	}, []);

	if (!subscription) return null;

	// Tính số ngày còn lại
	const startDate = new Date(subscription.start_date);
	const endDate = new Date(subscription.end_date);
	const timeDiff = endDate.getTime() - startDate.getTime();
	const durationDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 để tính cả ngày bắt đầu
	const remainingDays = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

	// Format ngày tháng
	const formatDate = (dateString: string | Date) =>
		new Date(dateString).toLocaleDateString('vi-VN', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});

	return (
		<div className="flex items-center gap-3 px-4 py-2 bg-teal-50 rounded-lg border border-teal-100">
			<div className="flex-1 min-w-0">
				{/*<div className="flex items-center gap-2 mb-1">*/}
        {/*  <span className="text-sm font-semibold text-teal-600 truncate">*/}
        {/*    {subscription?.branch_plans?.name}*/}
        {/*  </span>*/}
				{/*</div>*/}

				<div className="flex flex-col items-center gap-2 text-xs text-teal-600">
          <span>
            còn lại {remainingDays} ngày ({formatDate(subscription.start_date)} - {formatDate(subscription.end_date)})
          </span>
					<div className={"flex items-center"}>
						<span className="font-semibold">Trạng thái:</span>
						<span>{subscription.status}</span>
					</div>
				</div>
			</div>

			{subscription.auto_renew && (
				<span className="px-2 py-1 bg-green-100 text-teal-500 text-xs font-medium rounded-full">
          Tự động gia hạn
        </span>
			)}
		</div>
	);
}

export default BranchPlan;