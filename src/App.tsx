import {ChakraProvider, theme,} from "@chakra-ui/react"
import {MainCtt} from "./components/MainCtt"

export const App = () => (
  <ChakraProvider theme={theme}>
    <MainCtt />
  </ChakraProvider>
)
