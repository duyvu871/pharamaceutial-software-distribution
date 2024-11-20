import React from 'react';
import type { ToastContainerProps} from "react-toastify";
import {ToastContainer} from "react-toastify";
import {Toaster} from "@global/constant/default-component-props";

interface ToastProps {
	children?: React.ReactNode;
};

function ToastLayout({children}: ToastProps): JSX.Element {
	return (
		<>
			{children}
			<ToastContainer {...(Toaster as ToastContainerProps)} />
		</>
	);
}

export default ToastLayout;