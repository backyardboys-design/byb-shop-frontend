"use client"
import classes from "./HomeCarousel.module.css"
import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"
import { Carousel } from "@mantine/carousel"
import { Box, Center, Image } from "@mantine/core"

const HomeCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }))
  const fade = useRef(Fade())
  return (
    <>
      <Box className={classes.overlay}>
        <Center maw={"100%"} h={"100%"}>
          <Box>
            <Center mt={20}>
              <Image
                src="/carousel/banner.png"
                maw="100%"
                w="100%"
                className={classes.logo}
                visibleFrom="sm"
              />
              <Image
                src="/carousel/banner-sm.png"
                maw="100%"
                w="100%"
                className={classes.logo}
                hiddenFrom="sm"
              />
            </Center>
          </Box>
        </Center>
      </Box>
      <Carousel
        className={classes.carousel}
        height={"100%"}
        plugins={[autoplay.current, fade.current]}
        withControls={false}
        withIndicators={false}
        emblaOptions={{ loop: true, align: "start" }}
      >
        <Carousel.Slide>
          <Image src="/carousel/slider1.png" fit="cover" h="100%" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src="/carousel/slider2.png" fit="cover" h="100%" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src="/carousel/slider3.png" fit="cover" h="100%" />
        </Carousel.Slide>
      </Carousel>
    </>
  )
}
export default HomeCarousel
