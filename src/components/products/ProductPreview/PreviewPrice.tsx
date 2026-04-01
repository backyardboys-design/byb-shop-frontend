import { Box, Text } from "@mantine/core"
import { clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <Box>
      {price.price_type === "sale" && (
        <>
          <Text
            ta="center"
            td="line-through"
            data-testid="original-price"
            c="dimmed"
          >
            {price.original_price}
          </Text>
        </>
      )}
      <Text
        ta="center"
        variant="gradient"
        size="lg"
        gradient={{ from: "grape", to: "indigo", deg: 145 }}
        fw={700}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </Box>
  )
}
