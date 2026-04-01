import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import Thumbnail from "@/modules/products/components/thumbnail"
import LocalizedLink from "@/components/common/LocalizedLink/LocalizedLink"
import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Group,
  Image,
  Text,
} from "@mantine/core"
import NextImage from "next/image"
import classes from "./ProductPreview.module.css"
import PreviewPrice from "./PreviewPrice"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedLink href={`/products/${product.handle}`} className="group">
      <Card shadow="sm" padding="lg" bg="transparent" className={classes.card}>
        <CardSection className={classes.imageWrapper}>
          {cheapestPrice?.price_type === "sale" && (
            <Badge
              size="lg"
              variant="gradient"
              pos="absolute"
              right={5}
              top={5}
              gradient={{ from: "grape", to: "indigo", deg: 145 }}
              style={{
                zIndex: 2,
              }}
            >
              SALE -{Math.round(((parseFloat(cheapestPrice.original_price.replace(/[^\d.-]/g, "")) - parseFloat(cheapestPrice.calculated_price.replace(/[^\d.-]/g, ""))) / parseFloat(cheapestPrice.original_price.replace(/[^\d.-]/g, ""))) * 100)}%
            </Badge>
          )}
          <Image
            component={NextImage}
            src={product.thumbnail}
            radius="md"
            className={classes.image}
            width={1000}
            height={160}
            alt={product.title}
            style={{
              aspectRatio: "1/1",
            }}
          />
        </CardSection>

        <Text fw={500} mt="xs" c="white" ta="center">
          {product.title}
        </Text>
        <Center>{cheapestPrice && <PreviewPrice price={cheapestPrice} />}</Center>
        
      </Card>
    </LocalizedLink>
  )
}
