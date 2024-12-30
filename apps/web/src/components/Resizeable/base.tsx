"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Box, useMantineTheme, BoxProps } from '@mantine/core';

interface ResizableProps extends BoxProps {
	children: React.ReactNode;
	minWidth?: number;
	minHeight?: number;
	defaultSize?: { width: number; height: number };
	direction?: 'horizontal' | 'vertical' | 'both';
}

type Direction = 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export const Resizable = forwardRef<HTMLDivElement, ResizableProps>(({
																																			 children,
																																			 minWidth = 200,
																																			 minHeight = 200,
																																			 defaultSize = { width: 400, height: 400 },
																																			 direction = 'both',
																																			 ...props
																																		 }, ref) => {
	const [size, setSize] = useState(defaultSize);
	const [isResizing, setIsResizing] = useState<Direction | null>(null);
	const containerRef = useRef<HTMLDivElement>(null); // Nội bộ

	const theme = useMantineTheme();

	useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isResizing || !containerRef.current) return;

			const containerRect = containerRef.current.getBoundingClientRect();

			if (direction === 'horizontal' || direction === 'both') {
				if (isResizing.includes('right')) {
					const newWidth = Math.max(e.clientX - containerRect.left, minWidth);
					setSize(prev => ({ ...prev, width: newWidth }));
				}
				if (isResizing.includes('left')) {
					const newWidth = Math.max(containerRect.right - e.clientX, minWidth);
					setSize(prev => ({ ...prev, width: newWidth }));
					containerRef.current.style.left = `${e.clientX}px`;
				}
			}

			if (direction === 'vertical' || direction === 'both') {
				if (isResizing.includes('bottom')) {
					const newHeight = Math.max(e.clientY - containerRect.top, minHeight);
					setSize(prev => ({ ...prev, height: newHeight }));
				}
				if (isResizing.includes('top')) {
					const newHeight = Math.max(containerRect.bottom - e.clientY, minHeight);
					setSize(prev => ({ ...prev, height: newHeight }));
					containerRef.current.style.top = `${e.clientY}px`;
				}
			}
		};

		const handleMouseUp = () => {
			setIsResizing(null);
		};

		if (isResizing) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isResizing, minWidth, minHeight, direction]);

	const handleResizeStart = (direction: Direction) => (e: React.MouseEvent) => {
		e.preventDefault();
		setIsResizing(direction);
	};

	const resizeHandleStyle = (direction: Direction): React.CSSProperties => ({
		position: 'absolute',
		background: theme.colors.blue[5],
		opacity: isResizing === direction ? 0.5 : 0,
		transition: 'opacity 0.2s',
		zIndex: 10,
		...(direction.includes('left') && { left: -4, width: 8, cursor: 'ew-resize' }),
		...(direction.includes('right') && { right: -4, width: 8, cursor: 'ew-resize' }),
		...(direction.includes('top') && { top: -4, height: 8, cursor: 'ns-resize' }),
		...(direction.includes('bottom') && { bottom: -4, height: 8, cursor: 'ns-resize' }),
		...((direction === 'topLeft' || direction === 'bottomRight') && { cursor: 'nwse-resize' }),
		...((direction === 'topRight' || direction === 'bottomLeft') && { cursor: 'nesw-resize' }),
	});

	return (
		<Box
			ref={containerRef} // Vẫn dùng containerRef nội bộ
			style={{
				position: 'relative',
				width: size.width,
				height: size.height,
				overflow: 'hidden',
			}}
			{...props}
		>
			{children}

			{/* Resize handles */}
			{(direction === 'horizontal' || direction === 'both') && (
				<>
					<Box style={resizeHandleStyle('left')} onMouseDown={handleResizeStart('left')} />
					<Box style={resizeHandleStyle('right')} onMouseDown={handleResizeStart('right')} />
				</>
			)}

			{(direction === 'vertical' || direction === 'both') && (
				<>
					<Box style={resizeHandleStyle('top')} onMouseDown={handleResizeStart('top')} />
					<Box style={resizeHandleStyle('bottom')} onMouseDown={handleResizeStart('bottom')} />
				</>
			)}

			{/* Corner resize handles */}
			{(direction === 'both') && (
				<>
					<Box style={{ ...resizeHandleStyle('topLeft'), width: 12, height: 12, left: -6, top: -6 }} onMouseDown={handleResizeStart('topLeft')} />
					<Box style={{ ...resizeHandleStyle('topRight'), width: 12, height: 12, right: -6, top: -6 }} onMouseDown={handleResizeStart('topRight')} />
					<Box style={{ ...resizeHandleStyle('bottomLeft'), width: 12, height: 12, left: -6, bottom: -6 }} onMouseDown={handleResizeStart('bottomLeft')} />
					<Box style={{ ...resizeHandleStyle('bottomRight'), width: 12, height: 12, right: -6, bottom: -6 }} onMouseDown={handleResizeStart('bottomRight')} />
				</>
			)}

			{/* Overlay when resizing */}
			{isResizing && (
				<Box
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						cursor: isResizing.includes('Left') || isResizing.includes('Right') ? 'ew-resize' : 'ns-resize',
						userSelect: 'none',
						zIndex: 1000,
					}}
				/>
			)}
		</Box>
	);
});
