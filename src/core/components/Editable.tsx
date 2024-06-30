import React, { useEffect, useRef } from "react"
import { Box, Input, InputProps, Textarea } from "@mantine/core"
import { useBoolean, useInput } from "react-hanger"

type P = {
  onSubmit?: (s: string) => any
  value: string
  textarea?: boolean
  onBlur?: any
  onlyWithKey?: "meta" | "alt"
  children: React.ReactNode
} & Partial<InputProps>

export const Editable: React.FC<P> = ({
  onSubmit,
  onlyWithKey,
  children,
  value,
  textarea,
  onBlur,
  ...rest
}) => {
  const state = useInput(value)
  const editing = useBoolean(false)

  const ref = useRef<any>()

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit?.(state.value)
      editing.setFalse()
    } else if (e.key === "Escape") {
      state.setValue(value)
      editing.setFalse()
    }
  }

  useEffect(() => {
    if (editing.value) {
      setTimeout(() => {
        ref.current?.setSelectionRange(0, ref.current.value.length)
      }, 100)
    }
  }, [editing.value])

  if (!editing.value)
    return (
      <Box
        onClick={(e) => {
          if (onlyWithKey) {
            const isMeta = e.metaKey || e.ctrlKey
            const isAlt = e.altKey
            if (onlyWithKey === "meta" && !isMeta) return
            if (onlyWithKey === "alt" && !isAlt) return
          }
          e.stopPropagation()
          e.preventDefault()
          editing.setTrue()
        }}
      >
        {children}
      </Box>
    )

  const Comp = textarea ? Textarea : Input

  return (
    <Comp
      autoFocus={true}
      onBlur={() => {
        editing.setFalse()
        onBlur?.()
      }}
      ref={ref}
      onKeyDown={onKeyDown}
      {...state.eventBind}
      {...rest}
    />
  )
}
