"use client";

import React, { ReactNode } from "react";
import { InstallPrompt, PushNotificationManager } from '@component/PWA';

export default function RootLayoutClient({ children }: {children: ReactNode}) {
	React.useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/sw.js")
				.then((registration) => {
					console.log("Service Worker registered with scope:", registration.scope);
				})
				.catch((error) => {
					console.error("Service Worker registration failed:", error);
				});
		}
	}, []);

	return (
		<>
			<PushNotificationManager />
			<InstallPrompt />
			{children}
		</>
	);
}