import { Title } from "@mantine/core"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <>
      <Title order={1} c="white">
        {product.title}
      </Title>
      
    </>
  )
}

export default ProductInfo
