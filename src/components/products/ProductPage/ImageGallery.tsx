"use client"
import { Box, Group, Image, UnstyledButton } from "@mantine/core"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import NextImage from "next/image"
import { useRef, useState } from "react"
import classes from "./ImageGallery.module.css"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
   const safeImages = images.filter(Boolean)

  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  if (!safeImages.length) return null

  const changeImage = (index: number) => {
    if (index === activeIndex) return

    setDirection(index > activeIndex ? "next" : "prev")
    setPrevIndex(activeIndex)
    setActiveIndex(index)
  }

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % safeImages.length
    changeImage(nextIndex)
  }

  const goPrev = () => {
    const prevIndex = (activeIndex - 1 + safeImages.length) % safeImages.length
    changeImage(prevIndex)
  }

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX

    if (touchStartX.current === null || touchEndX.current === null) return

    const distance = touchStartX.current - touchEndX.current
    const threshold = 50

    if (distance > threshold) {
      goNext()
    } else if (distance < -threshold) {
      goPrev()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <Box className={classes.wrapper}>
      <Box
        className={classes.mainImageWrapper}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        
      >
        <Image
          component={NextImage}
          src={safeImages[prevIndex].url}
          alt={safeImages[prevIndex].id}
          width={1000}
          height={1000}
          className={`${classes.imageLayer} ${classes.fadeOut}`}
              radius="md"
              style={{aspectRatio: "1/1"}}
        />

        <Image
          key={activeIndex}
          component={NextImage}
          src={safeImages[activeIndex].url}
          alt={safeImages[activeIndex].id}
          width={1000}
          height={1000}
          className={`${classes.imageLayer} ${classes.fadeIn}`}
              radius="md"
              style={{aspectRatio: "1/1"}}
        />

        <div className={classes.overlay} />
      </Box>

      <Group gap="xs" mt="sm" className={classes.thumbnailRow}>
        {safeImages.map((img, i) => (
          <UnstyledButton
            key={`${img}-${i}`}
            onClick={() => changeImage(i)}
            className={`${classes.thumb} ${
              activeIndex === i ? classes.activeThumb : ""
            }`}
            aria-label={`Bild ${i + 1} anzeigen`}
          >
            <Image
              component={NextImage}
              src={img.url}
              alt={`${img.id}-${i + 1}`}
              width={50}
              height={50}
              className={classes.thumbImage}
              radius="md"
              style={{aspectRatio: "1/1"}}
            />
          </UnstyledButton>
        ))}
      </Group>
    </Box>
  )
}

export default ImageGallery
