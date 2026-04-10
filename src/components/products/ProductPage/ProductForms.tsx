"use client"
import { addToCart } from "@/lib/data/cart"
import {
  Badge,
  Box,
  Button,
  Group,
  Image,
  Radio,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core"
import { HttpTypes } from "@medusajs/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import classes from "./ProductForms.module.css"
type FullustomProps = {
  variantId: HttpTypes.StoreProductVariant | undefined
  countryCode: string
  setIsAdding: Dispatch<SetStateAction<boolean>>
  disabled: boolean
  loading: boolean
}
export const FullCustomForm = ({
  variantId,
  countryCode,
  setIsAdding,
  disabled = false,
  loading = false,
}: FullustomProps) => {
  const [form, setForm] = useState({
    bike_brand: "",
    bike_model: "",
    bike_year: "",
    plastic_parts_info: "",
    colors: "",
    design_notes: "",
    base: "Regular",
    finish: "Glossy",
  })

  type PremiumBaseOption = {
    value: string
    label: string
    image: string
  }
  type PremiumFinishOption = {
    value: string
    label: string
    image: string
  }
  const premiumBaseOptions: PremiumBaseOption[] = [
    {
      value: "Regular",
      label: "Regular",
      image: "/products/premium-base-regular.png",
    },
    {
      value: "Full Chrome",
      label: "Full Chrome",
      image: "/products/premium-base-chrome.png",
    },
    {
      value: "Full Holographic Chrome",
      label: "Full Holographic Chrome",
      image: "/products/premium-base-holographic.png",
    },
  ]
  const premiumFinishOptions: PremiumFinishOption[] = [
    {
      value: "Glossy",
      label: "Glossy",
      image: "/products/premium-finish-glossy.png",
    },
    {
      value: "Matte",
      label: "Matte",
      image: "/products/premium-finish-matte.png",
    },
    {
      value: "Holographic Glitter",
      label: "Holographic Glitter",
      image: "/products/premium-finish-glitter.png",
    },
  ]

  const setField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleAddToCart = async () => {
    if (!variantId?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: variantId?.id,
      quantity: 1,
      countryCode,
      metadata: form,
    })

    setIsAdding(false)
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleAddToCart()
      }}
    >
      <Stack gap="sm" mt="md">
        <Box
          bg="white"
          p={2}
          style={{ borderRadius: "var(--mantine-radius-sm)" }}
        >
          <Text ta="center" fw={700} size="xl" c="black">
            BIKE INFORMATIONEN
          </Text>
        </Box>
        <TextInput
          label="Bike Marke"
          placeholder="z. B. KTM"
          size="md"
          radius="sm"
          variant="filled"
          value={form.bike_brand}
          onChange={(e) => setField("bike_brand", e.currentTarget.value)}
          required
        />
        <TextInput
          label="Bike Modell"
          placeholder="z. B. EXC 300"
          size="md"
          radius="sm"
          variant="filled"
          value={form.bike_model}
          onChange={(e) => setField("bike_model", e.currentTarget.value)}
          required
        />
        <TextInput
          label="Bike Baujahr"
          placeholder="z. B. 2015"
          size="md"
          radius="sm"
          variant="filled"
          value={form.bike_year}
          onChange={(e) => setField("bike_year", e.currentTarget.value)}
          required
        />
        <TextInput
          label="Informationen über deine Kunststoffteile"
          placeholder="z. B. schwarze Kunststoffteile mit KTM SMCR Kotflügel"
          size="md"
          radius="sm"
          variant="filled"
          value={form.plastic_parts_info}
          onChange={(e) =>
            setField("plastic_parts_info", e.currentTarget.value)
          }
        />
        <Box
          bg="white"
          p={2}
          style={{ borderRadius: "var(--mantine-radius-sm)" }}
        >
          <Text ta="center" fw={700} size="xl" c="black">
            DESIGN DETAILS
          </Text>
        </Box>
        <Textarea
          label="Farben"
          placeholder="z. B. Rot mit weißen Details, schwarzer Hintergrund"
          size="md"
          radius="sm"
          variant="filled"
          resize="vertical"
          autosize
          minRows={2}
          value={form.colors}
          onChange={(e) => setField("colors", e.currentTarget.value)}
        />
        <Textarea
          label="Wie möchtest du dein Design gestalten?"
          placeholder={`Ich möchte den Text "XXXX" auf dem Bühler und das "XXXX"-Logo aud der Airbox. \n Das  Design soll aggressiv wirken, mit schwarzer Basis und lila Chrome-Details. \nAußerdem hätte ich gerne ein Smiley-Gesicht auf dem vorderen Kotflügel.`}
          size="md"
          radius="sm"
          variant="filled"
          minRows={5}
          resize="vertical"
          autosize
          value={form.design_notes}
          onChange={(e) => setField("design_notes", e.currentTarget.value)}
          required
        />{" "}
        <Box
          bg="white"
          p={2}
          style={{ borderRadius: "var(--mantine-radius-sm)" }}
        >
          <Text ta="center" fw={700} size="xl" c="black">
            UPGRADES & FINISHES
          </Text>
        </Box>
        <Radio.Group
          label="Premium Base"
          withAsterisk
          value={form.base}
          onChange={(e) => setField("base", e)}
          required
        >
          <Group>
            {premiumBaseOptions.map((option) => {
              const selected = form.base === option.value

              return (
                <Radio.Card
                  key={option.value}
                  value={option.value}
                  p={10}
                  radius="md"
                  style={{
                    width: 120,
                    overflow: "hidden",
                    border: selected
                      ? "2px solid var(--mantine-color-white)"
                      : "1px solid var(--mantine-color-dark-4)",
                  }}
                  className={classes.radio_card}
                >
                  <Stack gap={0}>
                    <Tooltip label={option.label} color="gray.9">
                      <Image
                        src={option.image}
                        alt={option.label}
                        h={100}
                        w={100}
                        fit="cover"
                        radius="sm"
                        className={classes.radio_img}
                      />
                    </Tooltip>
                  </Stack>
                </Radio.Card>
              )
            })}
          </Group>
        </Radio.Group>
        <Radio.Group
          label="Premium Finish"
          withAsterisk
          value={form.finish}
          onChange={(e) => setField("finish", e)}
          required
        >
          <Group>
            {premiumFinishOptions.map((option) => {
              const selected = form.finish === option.value

              return (
                <Radio.Card
                  key={option.value}
                  value={option.value}
                  p={10}
                  radius="md"
                  style={{
                    width: 120,
                    overflow: "hidden",
                    border: selected
                      ? "2px solid var(--mantine-color-white)"
                      : "1px solid var(--mantine-color-dark-4)",
                  }}
                  className={classes.radio_card}
                >
                  <Stack gap={0}>
                    <Tooltip label={option.label} color="gray.9">
                      <Image
                        src={option.image}
                        alt={option.label}
                        h={100}
                        w={100}
                        fit="cover"
                        radius="sm"
                        className={classes.radio_img}
                      />
                    </Tooltip>
                  </Stack>
                </Radio.Card>
              )
            })}
          </Group>
        </Radio.Group>
        <Button
          fullWidth
          type="submit"
          variant="gradient"
          gradient={{ from: "grape", to: "indigo", deg: 145 }}
          radius="md"
          size="lg"
          disabled={disabled}
          loading={loading}
        >
          In Warenkorb legen
        </Button>
      </Stack>
    </form>
  )
}

type SemiCustomProps = {
  variantId: HttpTypes.StoreProductVariant | undefined
  countryCode: string
  setIsAdding: Dispatch<SetStateAction<boolean>>
  disabled: boolean
  loading: boolean

  baseValue?: string
  finishValue?: string
  onBaseChange: (value: string) => void
  onFinishChange: (value: string) => void
}
export const SemiCustomForm = ({
  variantId,
  countryCode,
  setIsAdding,
  disabled = false,
  loading = false,
  baseValue,
  finishValue,
  onBaseChange,
  onFinishChange,
}: SemiCustomProps) => {
  const [form, setForm] = useState({
    bike_brand: "",
    bike_model: "",
    bike_year: "",
    plastic_parts_info: "",
    base: "Regular",
    finish: "Glossy",
  })

  type PremiumBaseOption = {
    value: string
    label: string
    surcharge: number
    image: string
  }
  type PremiumFinishOption = {
    value: string
    label: string
    surcharge: number
    image: string
  }
  const premiumBaseOptions: PremiumBaseOption[] = [
    {
      value: "Regular",
      label: "Regular",
      surcharge: 0,
      image: "/products/premium-base-regular.png",
    },
    {
      value: "Full Chrome",
      label: "Full Chrome",
      surcharge: 1500,
      image: "/products/premium-base-chrome.png",
    },
    {
      value: "Full Holographic Chrome",
      label: "Full Holographic Chrome",
      surcharge: 2500,
      image: "/products/premium-base-holographic.png",
    },
  ]
  const premiumFinishOptions: PremiumFinishOption[] = [
    {
      value: "Glossy",
      label: "Glossy",
      surcharge: 0,
      image: "/products/premium-finish-glossy.png",
    },
    {
      value: "Matte",
      label: "Matte",
      surcharge: 1500,
      image: "/products/premium-finish-matte.png",
    },
    {
      value: "Holographic Glitter",
      label: "Holographic Glitter",
      surcharge: 2500,
      image: "/products/premium-finish-glitter.png",
    },
  ]

  const setField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleAddToCart = async () => {
    if (!variantId?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: variantId?.id,
      quantity: 1,
      countryCode,
      metadata: form,
    })

    setIsAdding(false)
  }

  const changeBase = (e: string) => {
    onBaseChange(e)
    setField("base", e)
  }
  const changeFinish = (e: string) => {
    onFinishChange(e)
    setField("finish", e)
  }

  useEffect(() => {
    changeBase(form.base)
    changeFinish(form.finish)
  }, [])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleAddToCart()
      }}
    >
      <Stack gap="sm" mt="md">
        <Box
          bg="white"
          p={2}
          style={{ borderRadius: "var(--mantine-radius-sm)" }}
        >
          <Text ta="center" fw={700} size="xl" c="black">
            BIKE INFORMATIONEN
          </Text>
        </Box>
        <TextInput
          label="Bike Marke"
          placeholder="z. B. KTM"
          size="md"
          radius="sm"
          variant="filled"
          value={form.bike_brand}
          onChange={(e) => setField("bike_brand", e.currentTarget.value)}
          required
        />
        <TextInput
          label="Bike Modell"
          placeholder="z. B. EXC 300"
          size="md"
          radius="sm"
          variant="filled"
          value={form.bike_model}
          onChange={(e) => setField("bike_model", e.currentTarget.value)}
          required
        />
        <TextInput
          label="Bike Baujahr"
          placeholder="z. B. 2015"
          size="md"
          radius="sm"
          variant="filled"
          value={form.bike_year}
          onChange={(e) => setField("bike_year", e.currentTarget.value)}
          required
        />
        <TextInput
          label="Informationen über deine Kunststoffteile"
          placeholder="z. B. schwarze Kunststoffteile mit KTM SMCR Kotflügel"
          size="md"
          radius="sm"
          variant="filled"
          value={form.plastic_parts_info}
          onChange={(e) =>
            setField("plastic_parts_info", e.currentTarget.value)
          }
        />
        <Box
          bg="white"
          p={2}
          style={{ borderRadius: "var(--mantine-radius-sm)" }}
        >
          <Text ta="center" fw={700} size="xl" c="black">
            UPGRADES & FINISHES
          </Text>
        </Box>
        <Radio.Group
          label="Premium Base"
          withAsterisk
          value={form.base}
          onChange={(e) => changeBase(e)}
          required
        >
          <Group>
            {premiumBaseOptions.map((option) => {
              const selected = form.base === option.value

              return (
                <Radio.Card
                  key={option.value}
                  value={option.value}
                  p={10}
                  radius="md"
                  style={{
                    width: 120,
                    overflow: "hidden",
                    border: selected
                      ? "2px solid var(--mantine-color-white)"
                      : "1px solid var(--mantine-color-dark-4)",
                  }}
                  className={classes.radio_card}
                >
                  <Stack gap={0}>
                    <Tooltip label={option.label} color="gray.9">
                      <Image
                        src={option.image}
                        alt={option.label}
                        h={100}
                        w={100}
                        fit="cover"
                        radius="sm"
                        className={classes.radio_img}
                      />
                    </Tooltip>
                  </Stack>
                </Radio.Card>
              )
            })}
          </Group>
        </Radio.Group>
        <Radio.Group
          label="Premium Finish"
          withAsterisk
          value={form.finish}
          onChange={(e) => changeFinish(e)}
          required
        >
          <Group>
            {premiumFinishOptions.map((option) => {
              const selected = form.finish === option.value

              return (
                <Radio.Card
                  key={option.value}
                  value={option.value}
                  p={10}
                  radius="md"
                  style={{
                    width: 120,
                    overflow: "hidden",
                    border: selected
                      ? "2px solid var(--mantine-color-white)"
                      : "1px solid var(--mantine-color-dark-4)",
                  }}
                  className={classes.radio_card}
                >
                  <Stack gap={0}>
                    <Tooltip label={option.label} color="gray.9">
                      <Image
                        src={option.image}
                        alt={option.label}
                        h={100}
                        w={100}
                        fit="cover"
                        radius="sm"
                        className={classes.radio_img}
                      />
                    </Tooltip>
                  </Stack>
                </Radio.Card>
              )
            })}
          </Group>
        </Radio.Group>
        <Button
          fullWidth
          type="submit"
          variant="gradient"
          gradient={{ from: "grape", to: "indigo", deg: 145 }}
          radius="md"
          size="lg"
          disabled={disabled}
          loading={loading}
        >
          In Warenkorb legen
        </Button>
      </Stack>
    </form>
  )
}

type ReprintDesignProps = {
  variantId: HttpTypes.StoreProductVariant | undefined
  countryCode: string
  setIsAdding: Dispatch<SetStateAction<boolean>>
  disabled: boolean
  loading: boolean
}
export const ReprintDesignForm = ({
  variantId,
  countryCode,
  setIsAdding,
  disabled = false,
  loading = false,
}: ReprintDesignProps) => {
  const [form, setForm] = useState({
    order_number: "",
    parts: "",
    adapt_fitment: "",
  })

  const setField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleAddToCart = async () => {
    if (!variantId?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: variantId?.id,
      quantity: 1,
      countryCode,
      metadata: form,
    })

    setIsAdding(false)
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleAddToCart()
      }}
    >
      <Stack gap="sm" mt="md">
        <Box
          bg="white"
          p={2}
          style={{ borderRadius: "var(--mantine-radius-sm)" }}
        >
          <Text ta="center" fw={700} size="xl" c="black">
            ORDER INFORMATION
          </Text>
        </Box>
        <TextInput
          label="Bestellnummer"
          placeholder="#12325"
          size="md"
          radius="sm"
          variant="filled"
          value={form.order_number}
          onChange={(e) => setField("order_number", e.currentTarget.value)}
          required
        />
        <TextInput
          label="Anpassung an neue Kunststoffteile? (Keine Designänderungen)"
          placeholder="Ändern auf KTM-Scheinwerfer (Modell 2020)"
          size="md"
          radius="sm"
          variant="filled"
          value={form.adapt_fitment}
          onChange={(e) => setField("adapt_fitment", e.currentTarget.value)}
        />
        <Button
          fullWidth
          type="submit"
          variant="gradient"
          gradient={{ from: "grape", to: "indigo", deg: 145 }}
          radius="md"
          size="lg"
          disabled={disabled}
          loading={loading}
        >
          In Warenkorb legen
        </Button>
      </Stack>
    </form>
  )
}
export const ClothingForm = () => {}
