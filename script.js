const SERVER_HOST = "6b6t.org";
const STATUS_API = `https://api.mcstatus.io/v2/status/java/${SERVER_HOST}`;

const onlineCount = document.getElementById("online-count");
const serverState = document.getElementById("server-state");
const playerCap = document.getElementById("player-cap");
const playerMeter = document.getElementById("player-meter");
const lastUpdated = document.getElementById("last-updated");
const statusError = document.getElementById("status-error");

async function refreshServerStatus() {
  serverState.textContent = "Checking server status…";
  try {
    const response = await fetch(STATUS_API, { cache: "no-store" });
    if (!response.ok) throw new Error(`Status API returned ${response.status}`);
    const data = await response.json();
    if (!data.online) throw new Error("The server is currently reported offline.");

    const online = Number(data.players?.online ?? 0);
    const maximum = Number(data.players?.max ?? 0);
    onlineCount.textContent = online.toLocaleString();
    serverState.textContent = "Server is online";
    playerCap.textContent = `Maximum players: ${maximum ? maximum.toLocaleString() : "unknown"}`;
    playerMeter.style.width = maximum > 0 ? `${Math.min(100, (online / maximum) * 100)}%` : "0%";
    lastUpdated.textContent = `Updated ${new Date().toLocaleTimeString()}`;
    statusError.textContent = "Live count retrieved from the public Minecraft status service.";
  } catch (error) {
    onlineCount.textContent = "—";
    serverState.textContent = "Live status unavailable";
    playerCap.textContent = "Could not retrieve player capacity";
    playerMeter.style.width = "0%";
    lastUpdated.textContent = `Checked ${new Date().toLocaleTimeString()}`;
    statusError.textContent = `${error.message} You can check the official 6b6t status page using the link below.`;
  }
}

document.getElementById("player-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("player-name");
  const result = document.getElementById("lookup-result");
  const username = input.value.trim();

  if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {
    result.textContent = "Please enter a valid Minecraft username (3–16 letters, numbers or underscores).";
    input.focus();
    return;
  }

  // The official site owns the player data. Do not fabricate a playtime estimate.
  const profileUrl = `https://www.6b6t.org/stats/${encodeURIComponent(username.toLowerCase())}`;
  result.textContent = `Opening the official 6b6t statistics profile for ${username}. If no profile opens, use the official statistics directory below to search manually.`;
  window.open(profileUrl, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();
refreshServerStatus();
window.setInterval(refreshServerStatus, 60_000);
