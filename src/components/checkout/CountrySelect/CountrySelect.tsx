import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"

import { NativeSelectProps } from "@modules/common/components/native-select"
import { HttpTypes } from "@medusajs/types"
import { Group, Select, Text } from "@mantine/core"
import { IconFlag } from "@tabler/icons-react"
import ReactCountryFlag from "react-country-flag"

const CountrySelect = forwardRef<
  HTMLInputElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion
  }
>(({ placeholder = "Land", region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLInputElement>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => innerRef.current
  )

  const countryOptions = useMemo(() => {
    if (!region) {
      return []
    }

    return region.countries?.map((country) => ({
      value: country.iso_2 ?? "",
      label: country.display_name ?? "",
    }))
  }, [region])

  return (
    <Select
      variant="filled"
      label="Land"
      leftSection={<IconFlag size={16} />}
      size="md"
      withAsterisk
      ref={innerRef}
      placeholder={placeholder}
      data={countryOptions}
      defaultValue={defaultValue || countryOptions[0]?.value}
      renderOption={({ option }) => (
        <Group gap="sm">
          <ReactCountryFlag
            countryCode={option.value}
            svg
            style={{ width: 20, height: 20 }}
          />
          <Text>{option.label}</Text>
        </Group>
      )}
      // 👇 Ausgewählter Wert (wichtig!)

      {...props}
    ></Select>
  )
})

CountrySelect.displayName = "Land"

export default CountrySelect
