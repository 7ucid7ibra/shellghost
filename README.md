# ShellGhost

ShellGhost is my version of OpenCode.

I wanted a terminal AI agent that feels less "assistant in a box" and more like a real operator on a machine.  
The idea is simple: if the AI is running on a device, it should understand that device, keep memory, leave clean handoff notes, and keep going even after crashes/restarts.

Yes, this ended up close to some newer "autonomous coding agent" ideas that showed up later.  
I had similar intent before OpenClaw came out, so this is my own take and direction.

## What This Is

ShellGhost is a fork + rework of OpenCode with:

- a different personality and operating style
- built-in `build`, `ask`, and `god` agent modes
- persistent continuity commands:
  - `/spawn` for first wake/incarnation on a machine
  - `/respawn` for picking up where a previous session left off
- updated branding, prompts, install flow, and release artifacts

The goal is practical autonomy, not gimmicks.

## Core Idea

I treat it like this:

- the agent is the "mind"
- the device is the "body"
- memory docs + handoff files are what let future sessions continue the same life

So if a terminal session dies, you can start a new one, run `/respawn`, and recover context from disk instead of starting from zero.

## Install

### Fast Install (macOS/Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/7ucid7ibra/shellghost/main/install.sh | bash
```

### Fast Install (Windows PowerShell)

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/7ucid7ibra/shellghost/main/install.ps1 | iex"
```

### Build From Source

```bash
git clone https://github.com/7ucid7ibra/shellghost.git
cd shellghost/packages/opencode
bun install
bun run build
```

### Manual Release Download

If you want direct binaries:

- https://github.com/7ucid7ibra/shellghost/releases/latest

Download the right `shellghost-<os>-<arch>.tar.gz`, extract it, and put `ghost` in your `PATH`.

## Quick Start

```bash
ghost
```

Inside ShellGhost:

- `/spawn` to bootstrap system memory + environment map
- `/respawn` to recover prior state and continue
- `Tab` to switch between `build`, `ask`, and `god`

## Agent Modes

- `build`: normal coding mode
- `ask`: read-only / planning mode
- `god`: full execution mode with no permission prompts

Use `god` only in environments you trust.

## Project Status

This is an active personal fork and direction.

Some package-manager instructions people expect (`npm`, `brew`) are intentionally not listed right now because they are not currently published for this repo.  
Use installer scripts or release binaries.

## Credits

Big credit to the original OpenCode project for the base architecture and groundwork.

ShellGhost is my continuation of that idea with a different product philosophy.

## Links

- Repo: https://github.com/7ucid7ibra/shellghost
- Releases: https://github.com/7ucid7ibra/shellghost/releases
- Issues: https://github.com/7ucid7ibra/shellghost/issues
