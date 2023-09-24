import { Image, ImageProps } from 'expo-image'

type PhotoProps = ImageProps & {
  size: number
  uri: string
}

export function Photo({ size, uri, ...rest }: PhotoProps) {
  return (
    <Image
      {...rest}
      style={{
        flex: 1,
        borderRadius: 80,
        width: size,
        height: size,
      }}
      alt="Profile photo"
      contentFit="contain"
      source={{ uri }}
      blurRadius={0.5}
    />
  )
}
