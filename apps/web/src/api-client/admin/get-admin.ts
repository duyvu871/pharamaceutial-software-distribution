// getAdminData.ts
// import { Stat } from '../../schema/stat'
// import { statMock } from '../../mock/dataAdmin';
import { useMock } from 'config';
import { statMock } from '../../_mock/admin/data-admin.ts';
import { Stat } from '@schema/test/stat.ts';
// import { statMock } from '../../_mock/stat-mock.ts';
export type  GetStatParams =   {
	type: 'main' |'Branch' | 'sub';


};

export const getAdminData = async (params: GetStatParams, isMock?: boolean): Promise<Stat | undefined> => {
	if (typeof isMock == 'boolean' && isMock) {
		return statMock[params.type]; // Trả về mock nếu yêu cầu
	}
	if (typeof isMock === 'undefined' && useMock) {
		return statMock[params.type];
	}

	//Doan sau goi api that thi toi chua bt as
};