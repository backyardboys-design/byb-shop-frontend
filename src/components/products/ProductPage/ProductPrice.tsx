import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { Box, Group, Text, Title } from "@mantine/core"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <>
      <Group justify="flex-start">
        <Text
          component={Title}
          order={1}
          fw={900}
          variant="gradient"
          gradient={{ from: "grape", to: "indigo.6", deg: 145 }}
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </Text>
        {selectedPrice.price_type === "sale" && (
          <Text
            size="lg"
            td="line-through"
            c="dimmed"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </Text>
        )}
      </Group>
    </>
  )
}
