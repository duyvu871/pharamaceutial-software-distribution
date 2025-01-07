import { currentRewardPointAtom, rewardPointAtom } from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { currentBranchAtom } from '@store/state/overview/branch.ts';


export const useRewardPoint = () => {
	const [rewardPoint, setRewardPoint] = useAtom(rewardPointAtom);
	const [currentRewardPoint, setCurrentRewardPoint] = useAtom(currentRewardPointAtom);

	const [branchDetail] = useAtom(currentBranchAtom);


	const calculateRewardPoint = (point: number) => {
		if (!rewardPoint ||	!currentRewardPoint) return 0;
		if (point > currentRewardPoint.point_remain) return 0;
		const pointToPaid = point * rewardPoint.point_value;
		// setCurrentRewardPoint({
		// 	...currentRewardPoint,
		// 	point_remain: currentRewardPoint.point_remain - point,
		// });
		return pointToPaid;
	}

	const checkRewardPoint = useCallback((point: number) => {
		if (!currentRewardPoint) return false;
		return point <= currentRewardPoint.point_remain;
	}, [rewardPoint, currentRewardPoint]);

	return {
		rewardPoint,
		setRewardPoint,
		currentRewardPoint,
		setCurrentRewardPoint,
		checkRewardPoint,
		calculateRewardPoint,
	};
}