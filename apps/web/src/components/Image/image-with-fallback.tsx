import { forwardRef, useEffect, useState, SyntheticEvent, HTMLProps } from "react"
import ImageNext, {ImageProps as NextImageProps} from "next/image"
import { Image as ImageMantine, ImageProps } from "@mantine/core"

const fallbackImage = '/images/placeholder.png'

export type ImageWithFallbackProps = NextImageProps & {
	fallback?: string
}

export type ImageMantineWithFallbackProps = ImageProps  & {
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

const ImageMantineWithFallback = forwardRef<HTMLImageElement, ImageMantineWithFallbackProps>(({ fallback = fallbackImage, src, ...props }, ref) => {

	return (
		<ImageMantine
			fallbackSrc={fallback}
			src={src}
			ref={ref}
			{...props}
		/>
	)
})
ImageMantineWithFallback.displayName = 'ImageMantineWithFallback'

export { ImageWithFallback, ImageMantineWithFallback }
