import { currentRewardPointAtom, rewardPointAtom } from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';


export const useRewardPoint = () => {
	const [rewardPoint, setRewardPoint] = useAtom(rewardPointAtom);
	const [currentRewardPoint, setCurrentRewardPoint] = useAtom(currentRewardPointAtom);

	const calculateRewardPoint = (point: number) => {
		if (!rewardPoint ||	!currentRewardPoint) return 0;
		if (point > currentRewardPoint.point_remain) return 0;
		const pointToPaid = point * rewardPoint.convert_rate;
		setCurrentRewardPoint({
			...currentRewardPoint,
			point_remain: currentRewardPoint.point_remain - point,
		});
		return pointToPaid;
	}

	return {
		rewardPoint,
		setRewardPoint,
		currentRewardPoint,
		setCurrentRewardPoint,
		calculateRewardPoint,
	};
}