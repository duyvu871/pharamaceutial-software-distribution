'use client'

import { useState, useEffect, useRef } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from "@app/action"
import { X } from 'lucide-react'

export function urlBase64ToUint8Array(base64String: string) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

	const rawData = window.atob(base64)
	const outputArray = new Uint8Array(rawData.length)

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i)
	}
	return outputArray
}
export function PushNotificationManager() {
	const [isSupported, setIsSupported] = useState(false)
	const [subscription, setSubscription] = useState<PushSubscription | null>(
		null
	)
	const [message, setMessage] = useState('')

	useEffect(() => {
		if ('serviceWorker' in navigator && 'PushManager' in window) {
			setIsSupported(true)
			registerServiceWorker()
		}
	}, [])

	async function registerServiceWorker() {
		const registration = await navigator.serviceWorker.register('/sw.js', {
			scope: '/',
			updateViaCache: 'none',
		})
		const sub = await registration.pushManager.getSubscription()
		setSubscription(sub)
	}

	async function subscribeToPush() {
		const registration = await navigator.serviceWorker.ready
		const sub = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(
				process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
			),
		})
		setSubscription(sub)
		const serializedSub = JSON.parse(JSON.stringify(sub))
		await subscribeUser(serializedSub)
	}

	async function unsubscribeFromPush() {
		await subscription?.unsubscribe()
		setSubscription(null)
		await unsubscribeUser()
	}

	async function sendTestNotification() {
		if (subscription) {
			await sendNotification(message)
			setMessage('')
		}
	}

	if (!isSupported) {
		return <p>Push notifications are not supported in this browser.</p>
	}

	return (
		<div>
			<h3>Push Notifications</h3>
			{subscription ? (
				<>
					<p>You are subscribed to push notifications.</p>
					<button onClick={unsubscribeFromPush}>Unsubscribe</button>
					<input
						type="text"
						placeholder="Enter notification message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button onClick={sendTestNotification}>Send Test</button>
				</>
			) : (
				<>
					<p>You are not subscribed to push notifications.</p>
					<button onClick={subscribeToPush}>Subscribe</button>
				</>
			)}
		</div>
	)
}

export default function InstallPrompt() {
	const [isVisible, setIsVisible] = useState(true)
	const [isIOS, setIsIOS] = useState(false)
	const [isStandalone, setIsStandalone] = useState(false)

	useEffect(() => {
		setIsIOS(
			/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
		)
		setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
	}, [])

	if (isStandalone || !isVisible) {
		return null
	}

	return (
		<div className="fixed top-0 left-0 right-0 flex justify-center z-50">
			<div className="bg-white bg-opacity-95 shadow-lg rounded-b-lg max-w-md w-full mx-4 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
				<div className="relative p-4">
					<div className="absolute inset-0 bg-teal-500 opacity-10"></div>
					<button
						onClick={() => setIsVisible(false)}
						className="absolute top-2 right-2 text-teal-600 hover:text-teal-800 transition-colors"
						aria-label="Đóng"
					>
						<X size={20} />
					</button>
					<div className="relative z-10">
						<h3 className="text-lg font-semibold text-teal-800 mb-2">Cài đặt ứng dụng của chúng tôi</h3>
						<p className="text-sm text-teal-700 mb-3">
							Trải nghiệm tốt hơn với ứng dụng của chúng tôi! Cài đặt ngay để:
						</p>
						<ul className="text-xs text-teal-600 mb-3 list-disc list-inside">
							<li>Truy cập nhanh hơn</li>
							<li>Sử dụng offline</li>
							<li>Nhận thông báo quan trọng</li>
						</ul>
						<button className="bg-teal-600 text-white text-sm py-2 px-4 rounded hover:bg-teal-700 transition-colors w-full mb-2">
							Thêm vào màn hình chính
						</button>
						{isIOS && (
							<p className="text-xs text-teal-700">
								Để cài đặt: Nhấn
								<span role="img" aria-label="biểu tượng chia sẻ" className="mx-1">
                  ⎋
                </span>
								rồi chọn "Thêm vào màn hình chính"
								<span role="img" aria-label="biểu tượng cộng" className="mx-1">
                  ➕
                </span>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}



export function InstallPromptManager() {
	const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
	const [isVisible, setIsVisible] = useState(true)
	const [isIOS, setIsIOS] = useState(false)
	const [isStandalone, setIsStandalone] = useState(false)

	const installButtonRef = useRef<HTMLButtonElement>(null);

	const handleInstall = async () => {
		if (!deferredPrompt) {
			return
		}

		// Show the install prompt
		// @ts-ignore
		deferredPrompt.prompt()
		// Wait for the user to respond to the prompt
		// @ts-ignore
		const { outcome } = await deferredPrompt.userChoice
		console.log('User prompt outcome:', outcome)
		if (outcome === 'accepted') {
			console.log('User accepted the prompt')
		} else {
			console.log('User dismissed the prompt')
		}
		setIsVisible(false)
	}

	useEffect(() => {
		setIsIOS(
			/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
		)
		setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
	}, [])

	useEffect(() => {
		const handler = (e: Event) => {
			e.preventDefault()
			setDeferredPrompt(e)
			console.log('beforeinstallprompt event fired', e);
		}

		window.addEventListener('beforeinstallprompt', handler as EventListener)

		return () => {
			window.removeEventListener('beforeinstallprompt', handler as EventListener)
		}
	}, [])

	if (isStandalone || !isVisible) {
		return null
	}

	if (!deferredPrompt) {
		return null
	}

	return  (
		<div className="fixed top-2 left-0 right-0 flex justify-center z-50">

			<div className="bg-white bg-opacity-95 shadow-lg rounded-b-lg max-w-md w-full mx-4 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
				<div className="relative p-4">
					<div className="absolute inset-0 bg-teal-500 opacity-10"></div>
					<button
						onClick={() => setIsVisible(false)}
						className="absolute top-2 right-2 text-teal-600 hover:text-teal-800 transition-colors"
						aria-label="Đóng"
					>
						<X size={20} />
					</button>
					<div className="relative z-10">
						<h3 className="text-lg font-semibold text-teal-800 mb-2">Cài đặt ứng dụng của chúng tôi</h3>
						<p className="text-sm text-teal-700 mb-3">
							Trải nghiệm tốt hơn với ứng dụng của chúng tôi! Cài đặt ngay để:
						</p>
						<ul className="text-xs text-teal-600 mb-3 list-disc list-inside">
							<li>Truy cập nhanh hơn</li>
							<li>Sử dụng offline</li>
							<li>Nhận thông báo quan trọng</li>
						</ul>
						<button
							ref={installButtonRef}
							onClick={handleInstall}
							className="max-w-60 bg-teal-600 text-white text-sm py-2 px-4 rounded hover:bg-teal-700 transition-colors w-full mb-2">
							Thêm vào màn hình chính
						</button>
						{isIOS && (
							<p className="text-xs text-teal-700">
								Để cài đặt: Nhấn
								<span role="img" aria-label="biểu tượng chia sẻ" className="mx-1">
                  ⎋
                </span>
								rồi chọn "Thêm vào màn hình chính"
								<span role="img" aria-label="biểu tượng cộng" className="mx-1">
                  ➕
                </span>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}