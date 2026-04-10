import React, { Suspense } from "react"

import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ImageGallery from "./ImageGallery"
import { Grid, GridCol } from "@mantine/core"
import ProductInfo from "./ProductInfo"
import ProductActions from "./ProductActions"
import ProductActionsWrapper from "./ProductActionsWrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[] | null
}

const ProductPage: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <Grid>
        <GridCol span={{ base: 12, md: 6.5 }}>
          {images != null && <ImageGallery images={images} />}
        </GridCol>
        <GridCol span={{ base: 12, md: 5.5 }} mt={20}>
          <ProductInfo product={product} />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </GridCol>
      </Grid>
    </>
  )
}

export default ProductPage
