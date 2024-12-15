'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Plus, X, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react'
import {
	invoiceActionAtom,
	invoiceActiveTabActionAtom,
	invoiceActiveTabAtom,
	invoiceAtom,
} from '@store/state/overview/invoice.ts';
import { useAtom } from 'jotai';
import { Typography } from '@component/Typography';
import { cn } from '@lib/tailwind-merge.ts';

interface Tab {
	id: string
	name: string
}

export default function DynamicTabs() {

	const [editingTab, setEditingTab] = useState<string | null>(null)
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const editInputRef = useRef<HTMLInputElement>(null)

	// const [activeTab, setActiveTab] = useAtom(invoiceActiveTabAtom);
	const [invoices, invoiceDispatch] = useAtom(invoiceActionAtom);
	const [activeTab, activeTabDispatch] = useAtom(invoiceActiveTabActionAtom)
	// const [invoices] = useAtom(invoiceAtom);

	const addTab = () => {
		const tabs = Object.values(invoices);
		const newTab = {
			name: `Hóa đơn ${tabs.length + 1}`,
		}
		const dispatch = invoiceDispatch({ type: 'add', name: newTab.name });
		// setTabs([...tabs, newTab])
		activeTabDispatch({ type: 'set', id: dispatch || tabs[tabs.length - 1].id});
	}

	const removeTab = (tabId: string) => {
		if (Object.keys(invoices).length === 1) {
			return
		}
		invoiceDispatch({ type: 'remove', id: tabId });
		const tabs = Object.keys(invoices).filter((id) => id !== tabId);
		if (activeTab === tabId && tabs.length > 0) {
			activeTabDispatch({ type: 'set', id: tabs[tabs.length - 1]});
		}
	}

	const startEditing = (tabId: string) => {
		setEditingTab(tabId)
	}

	const finishEditing = (tabId: string, newTitle: string) => {
		invoiceDispatch({ type: 'update-invoice-state', id: tabId, state: { name: newTitle } });
		setEditingTab(null)
	}

	const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
		if (e.key === 'Enter') {
			finishEditing(tabId, (e.target as HTMLInputElement).value)
		}
	}

	const scrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' })
		}
		// move to previous tab
		activeTabDispatch({ type: 'prev' });
	}

	const scrollRight = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' })
		}
		// move to next tab
		activeTabDispatch({ type: 'next' });
	}

	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth
		}
	}, [invoices])

	useEffect(() => {
		if (editingTab && editInputRef.current) {
			editInputRef.current.focus()
		}
	}, [editingTab]);

	useEffect(() => {
		const tabs = Object.values(invoices);
		if (activeTab === null && tabs.length > 0) {
			activeTabDispatch({ type: 'set', id: tabs[0].id});
		}
		if (tabs.length === 0) {
			addTab();
		}
		console.log('tabs:', tabs);
		console.log('activeTab:', activeTab);
	}, [invoices]);

	return (
		<div className="w-full max-w-3xl bg-teal-500 p-2 flex items-center">
			<button
				onClick={scrollLeft}
				className="text-white hover:bg-white/50 rounded p-1 mr-2"
			>
				<ChevronLeft className="w-5 h-5" />
			</button>
			<div
				ref={scrollContainerRef}
				className="flex gap-2 overflow-x-auto  max-w-[calc(100%-5rem)]"
			>
				{Object.values(invoices).map((tab) => (
					<div
						key={tab.id}
						className={cn(
							`flex-shrink-0 flex items-center bg-white rounded px-3 py-1.5 text-white`,
							{
								'bg-opacity-50': activeTab === tab.id,
								'hover:bg-opacity-50': activeTab !== tab.id,
							}
						)}
					>
						{editingTab === tab.id ? (
							<input
								ref={editInputRef}
								defaultValue={tab.name}
								onBlur={(e) => finishEditing(tab.id, e.target.value)}
								onKeyDown={(e) => handleKeyDown(e, tab.id)}
								className="bg-transparent border-b border-white outline-none text-zinc-700"
							/>
						) : (
							<>
								<Typography
									onClick={() => {
										console.log('tab.id:', tab.id);
										activeTabDispatch({ type: 'set', id: tab.id});
									}}
									color={'text'}
									className="mr-2 whitespace-nowrap cursor-pointer">{tab.name}</Typography>
								<button
									onClick={() => startEditing(tab.id)}
									className="hover:bg-opacity-50 rounded-md p-2 mr-1"
								>
									<Edit2 className="w-3 h-3 text-zinc-700" />
								</button>
							</>
						)}
						<button
							onClick={(e) => {
								e.stopPropagation()
								removeTab(tab.id)
							}}
							className="hover:bg-white/10 rounded-full p-0.5"
						>
							<X className="w-4 h-4 text-zinc-700" />
						</button>
					</div>
				))}
			</div>
			<div className="flex-shrink-0 flex items-center ml-2">
				<button
					onClick={scrollRight}
					className="text-white hover:bg-white/50 rounded p-1 mr-2"
				>
					<ChevronRight className="w-5 h-5" />
				</button>
				<button
					onClick={addTab}
					className="text-white hover:bg-white/50 rounded p-1"
				>
					<Plus className="w-5 h-5" />
				</button>
			</div>
		</div>
	)
}

