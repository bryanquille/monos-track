import { useEffect, useRef, useState } from "react"

export const useElementHeight = () => {
  const [elementHeight, setElementHeight] = useState(0)
  const [elementWidth, setElementWidth] = useState(0)
  const [elementLeftPosition, setElementLeftPosition] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const gettingElementHeight = () => {
      const elementHeight = elementRef.current?.clientHeight
      const elementLeftPosition = elementRef.current?.offsetLeft
      if (elementHeight) setElementHeight(elementHeight)
      if (elementLeftPosition) setElementLeftPosition(elementLeftPosition)
    }

    const gettingElementWidth = () => {
      const elementWidth = elementRef.current?.clientWidth
      if (elementWidth) setElementWidth(elementWidth)
    }

    gettingElementWidth()
    gettingElementHeight()
  }, [])

  return {
    elementHeight,
    elementWidth,
    elementLeftPosition,
    elementRef
  }
}