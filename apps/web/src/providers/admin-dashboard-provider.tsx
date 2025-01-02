import { createContext } from "react"


export type AdminDashboardContextType = {
}

export type AdminDashboardProviderProps = {
	children: React.ReactNode
}

export const AdminDashboardContext = createContext<AdminDashboardContextType>({})

export const AdminDashboardProvider = ({children}: AdminDashboardProviderProps) => {
	return (
		<AdminDashboardContext.Provider value={{}}>
			{children}
		</AdminDashboardContext.Provider>
	)
}