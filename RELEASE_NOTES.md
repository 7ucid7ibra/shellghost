# ShellGhost v0.1.0 - Initial Release

## Features
- AI-powered coding agent with friction minimization and escalation ladder
- Terminal-first development experience
- Multi-provider support (Claude, OpenAI, Google, local models)
- Built-in agents: build, plan, god modes
- Client/server architecture for remote access
- Cross-platform support (Linux, macOS, Windows)

## Installation

### Quick Install (macOS/Linux)
```bash
curl -fsSL https://raw.githubusercontent.com/7ucid7ibra/shellghost/main/install.sh | bash
```

### Quick Install (Windows PowerShell)
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/7ucid7ibra/shellghost/main/install.ps1 | iex"
```

### Build from Source
```bash
git clone https://github.com/7ucid7ibra/shellghost.git
cd shellghost/packages/opencode
bun install
bun run build
```

## Release Assets
Choose the appropriate binary for your system:
- `shellghost-darwin-arm64.tar.gz` - macOS Apple Silicon
- `shellghost-darwin-x64.tar.gz` - macOS Intel
- `shellghost-linux-x64.tar.gz` - Linux x64
- `shellghost-linux-arm64.tar.gz` - Linux ARM64
- `shellghost-windows-x64.tar.gz` - Windows x64

## Escalation Policy
This release includes the new friction minimization and escalation ladder policy - the AI will exhaust all autonomous options before asking for user intervention.
