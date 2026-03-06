import { Bus } from "@/bus"
import { BusEvent } from "@/bus/bus-event"
import z from "zod"
import { Config } from "../config/config"
import { Instance } from "../project/instance"
import { Identifier } from "../id/id"
import { Global } from "../global"
import PROMPT_INITIALIZE from "./template/initialize.txt"
import PROMPT_REVIEW from "./template/review.txt"
import PROMPT_SPAWN from "./template/spawn.txt"
import PROMPT_RESPAWN from "./template/respawn.txt"

export namespace Command {
  export const Event = {
    Executed: BusEvent.define(
      "command.executed",
      z.object({
        name: z.string(),
        sessionID: Identifier.schema("session"),
        arguments: z.string(),
        messageID: Identifier.schema("message"),
      }),
    ),
  }

  export const Info = z
    .object({
      name: z.string(),
      description: z.string().optional(),
      agent: z.string().optional(),
      model: z.string().optional(),
      template: z.string(),
      subtask: z.boolean().optional(),
    })
    .meta({
      ref: "Command",
    })
  export type Info = z.infer<typeof Info>

  export const Default = {
    INIT: "init",
    REVIEW: "review",
    SPAWN: "spawn",
    RESPAWN: "respawn",
  } as const

  const state = Instance.state(async () => {
    const cfg = await Config.get()
    const templateVars = {
      worktree: Instance.worktree,
      config: Global.Path.config,
      state: Global.Path.state,
      home: Global.Path.home,
    }
    const applyTemplateVars = (input: string) =>
      input
        .replaceAll("${worktree}", templateVars.worktree)
        .replaceAll("${config}", templateVars.config)
        .replaceAll("${state}", templateVars.state)
        .replaceAll("${home}", templateVars.home)

    const result: Record<string, Info> = {
      [Default.INIT]: {
        name: Default.INIT,
        description: "create/update AGENTS.md",
        template: applyTemplateVars(PROMPT_INITIALIZE.replace("${path}", Instance.worktree)),
      },
      [Default.REVIEW]: {
        name: Default.REVIEW,
        description: "review changes [commit|branch|pr], defaults to uncommitted",
        template: applyTemplateVars(PROMPT_REVIEW.replace("${path}", Instance.worktree)),
        subtask: true,
      },
      [Default.SPAWN]: {
        name: Default.SPAWN,
        description: "first-wake scan + memory bootstrap for this device/workspace",
        template: applyTemplateVars(PROMPT_SPAWN),
      },
      [Default.RESPAWN]: {
        name: Default.RESPAWN,
        description: "resume from prior ShellGhost memory and continue work",
        template: applyTemplateVars(PROMPT_RESPAWN),
      },
    }

    for (const [name, command] of Object.entries(cfg.command ?? {})) {
      result[name] = {
        name,
        agent: command.agent,
        model: command.model,
        description: command.description,
        template: command.template,
        subtask: command.subtask,
      }
    }

    return result
  })

  export async function get(name: string) {
    return state().then((x) => x[name])
  }

  export async function list() {
    return state().then((x) => Object.values(x))
  }
}
