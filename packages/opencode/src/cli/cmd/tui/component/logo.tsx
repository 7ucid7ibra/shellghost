import { TextAttributes } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/solid"
import { createMemo, For } from "solid-js"
import { useTheme } from "@tui/context/theme"

const WIDE_LOGO = [
  `                                `,
  ``,
  `   ███████╗██╗  ██╗███████╗██╗     ██╗             ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗`,
  `   ██╔════╝██║  ██║██╔════╝██║     ██║            ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝`,
  `   ███████╗███████║█████╗  ██║     ██║     ████╗  ██║  ███╗███████║██║   ██║███████╗   ██║`,
  `   ╚════██║██╔══██║██╔══╝  ██║     ██║     ╚═══╝  ██║   ██║██╔══██║██║   ██║╚════██║   ██║`,
  `   ███████║██║  ██║███████╗███████╗███████╗       ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║`,
  `   ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝        ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝`,
  ``,
  `                       "Hauntingly capable. Unreasonably authorized."`,
]

const COMPACT_LOGO = [``, `ShellGhost`, `"Hauntingly capable."`, ``]

const WIDE_LOGO_MIN_WIDTH = 96

export function Logo() {
  const { theme } = useTheme()
  const dimensions = useTerminalDimensions()
  const logo = createMemo(() => (dimensions().width >= WIDE_LOGO_MIN_WIDTH ? WIDE_LOGO : COMPACT_LOGO))

  return (
    <box>
      <For each={logo()}>
        {(line, index) => (
          <text
            fg={index() === 0 || index() === logo().length - 1 ? theme.textMuted : theme.text}
            attributes={
              logo() === WIDE_LOGO
                ? index() > 1 && index() < 8
                  ? TextAttributes.BOLD
                  : undefined
                : index() === 1
                  ? TextAttributes.BOLD
                  : undefined
            }
            selectable={false}
          >
            {line}
          </text>
        )}
      </For>
    </box>
  )
}
