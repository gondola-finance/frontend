import {
  CSSWithMultiValues,
  RecursiveCSSObject,
} from "@chakra-ui/styled-system"

const variantPrimary = (): RecursiveCSSObject<CSSWithMultiValues> => {
  const disabled = {
    opacity: "1",
    color: "black",
    bg: "teal.500",
  }
  return {
    color: "black",
    bg: "teal.500",
    _hover: {
      color: "white",
      bg: "purple.500",
      _disabled: disabled,
    },
    _active: {
      color: "white",
      bg: "purple.500",
    },
    _disabled: disabled,
  }
}

const variants = {
  primary: variantPrimary,
}
export default { variants }
