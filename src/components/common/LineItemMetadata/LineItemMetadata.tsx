import { Box, Text } from "@mantine/core"
import { HttpTypes } from "@medusajs/types"

type LineItemMetadataProps = {
  item: HttpTypes.StoreCartLineItem | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemMetadata = ({
  item,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemMetadataProps) => {
  return (
    <>
      
       {item?.product_type === "Full Custom Design" && (
        <Box data-testid={dataTestid} data-value={dataValue} c="dark.4">
            <Text size="sm">Marke: {item.metadata?.bike_brand}</Text>
            <Text size="sm">Modell: {item.metadata?.bike_model}</Text>
            <Text size="sm">Baujahr: {item.metadata?.bike_year}</Text>
            {item.metadata?.plastic_parts_info != "" && (<Text size="sm">Kunststoffteile: {item.metadata?.plastic_parts_info}</Text>)}
            {item.metadata?.colors != "" && (<Text size="sm">Farben: {item.metadata?.colors}</Text>)}
            <Text size="sm">Design: {item.metadata?.design_notes}</Text>
            <Text size="sm">Premium Base: {item.metadata?.base}</Text>
            <Text size="sm">Premium Finish: {item.metadata?.finish}</Text>
        </Box>
      )}
      {item?.product_type === "Semi Custom Designs" && (
        <Box data-testid={dataTestid} data-value={dataValue} c="dark.4">
            <Text size="sm">Marke: {item.metadata?.bike_brand}</Text>
            <Text size="sm">Modell: {item.metadata?.bike_model}</Text>
            <Text size="sm">Baujahr: {item.metadata?.bike_year}</Text>
            {item.metadata?.plastic_parts_info != "" && (<Text size="sm">Kunststoffteile: {item.metadata?.plastic_parts_info}</Text>)}
            <Text size="sm">Premium Base: {item.metadata?.base}</Text>
            <Text size="sm">Premium Finish: {item.metadata?.finish}</Text>
        </Box>
      )}
    </>
  )
}

export default LineItemMetadata
