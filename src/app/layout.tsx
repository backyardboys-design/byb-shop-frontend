import "@mantine/core/styles.css"
import"@styles/global.css";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

const RootLayout = (props: { children: React.ReactNode }) => {
    return (
    <html lang="de" {...mantineHtmlProps}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ColorSchemeScript defaultColorScheme="dark" forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" forceColorScheme="dark">
          {props.children}
        </MantineProvider>
      </body>
    </html>)
}
export default RootLayout;