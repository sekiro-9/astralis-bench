import { spawn, spawnSync } from "node:child_process";

// pnpm and npm are .cmd shims on Windows, which spawn cannot run without a
// shell; with a shell, Node wants one command string rather than an args list.
// Every command here is a fixed string from these scripts, never user input.
const shell = process.platform === "win32";
const invocation = (command, args) => (shell ? [[command, ...args].join(" "), []] : [command, args]);

export function run(command, args, cwd) {
  const [file, list] = invocation(command, args);
  const result = spawnSync(file, list, { cwd, stdio: "inherit", shell });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed in ${cwd} (exit ${result.status})`);
  }
}

export function start(command, args, cwd) {
  const [file, list] = invocation(command, args);
  return spawn(file, list, { cwd, stdio: "ignore", shell });
}

export function stop(child) {
  if (child.exitCode !== null) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    child.kill("SIGTERM");
  }
}

export async function waitForServer(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // not listening yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`${url} did not answer within ${timeoutMs / 1000}s`);
}
