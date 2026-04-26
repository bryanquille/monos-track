import { useEffect, useRef, useState } from "react"

export const useElementHeight = () => {
  const [elementHeight, setElementHeight] = useState(0)
  const [elementWidth, setElementWidth] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const gettingElementHeight = () => {
      const elementHeight = elementRef.current?.clientHeight
      const elementTop = elementRef.current?.offsetTop
      if (elementHeight && elementTop) setElementHeight(elementHeight + elementTop)
    }

    const gettingElementWidth = () => {
      const elementWidth = elementRef.current?.clientWidth
      const elementLeft = elementRef.current?.offsetLeft
      if (elementWidth && elementLeft) setElementWidth(elementWidth + elementLeft)
    }

    gettingElementWidth()
    gettingElementHeight()
  }, [])

  return {
    elementHeight,
    elementWidth,
    elementRef
  }
}
