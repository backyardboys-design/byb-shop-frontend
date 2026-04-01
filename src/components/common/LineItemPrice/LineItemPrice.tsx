import { getPercentageDiff } from "@lib/util/get-percentage-diff"
import { convertToLocale } from "@lib/util/money"
import { Text } from "@mantine/core"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type LineItemPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
}

const LineItemPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemPriceProps) => {
  const { total, original_total } = item
  const originalPrice = original_total
  const currentPrice = total
  const hasReducedPrice = currentPrice < originalPrice

  return (
    <>
      {hasReducedPrice && (
        <Text size="sm" td="line-through" c="dimmed">
          {convertToLocale({
            amount: originalPrice,
            currency_code: currencyCode,
          })}
        </Text>
      )}
      <Text
      fw={900}
        variant="gradient"
        gradient={{ from: "grape", to: "indigo.6", deg: 145 }}
      >
        {convertToLocale({
          amount: currentPrice,
          currency_code: currencyCode,
        })}
      </Text>
    </>
  )
}

export default LineItemPrice
