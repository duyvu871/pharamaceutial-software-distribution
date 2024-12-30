import { forwardRef, useEffect, useState, SyntheticEvent } from "react"
import ImageNext, {ImageProps as NextImageProps} from "next/image"
import { Image as ImageMantine } from "@mantine/core"

const fallbackImage = '/images/placeholder.png'

export type ImageWithFallbackProps = NextImageProps & {
	fallback?: string
}

const ImageWithFallback = forwardRef<HTMLImageElement, ImageWithFallbackProps>(({ fallback = fallbackImage, alt, src, ...props }, ref) => {
	const [error, setError] = useState<SyntheticEvent | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		if (isLoaded) return;
		setError(null)
	}, [src, isLoaded])

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true)
		}, 2000);
	}, []);

	return (
		<ImageNext
			alt={alt}
			onError={(e) => {
				setError(e)
			}}
			onLoad={() => {
				setIsLoaded(true)
			}}
			src={error ? fallbackImage : src}
			ref={ref}
			{...props}
		/>
	)
})
ImageWithFallback.displayName = 'ImageWithFallback'

const ImageMantineWithFallback = forwardRef<HTMLImageElement, ImageWithFallbackProps>(({ fallback = fallbackImage, alt, src, ...props }, ref) => {
	const [error, setError] = useState<SyntheticEvent | null>(null)

	useEffect(() => {
		setError(null)
	}, [src])

	return (
		<ImageMantine
			alt={alt}
			onError={(e) => {
				setError(e)
			}}
			src={error ? fallbackImage : src}
			ref={ref}
			{...props}
		/>
	)
})
ImageMantineWithFallback.displayName = 'ImageMantineWithFallback'

export { ImageWithFallback, ImageMantineWithFallback }
