const apiBase = "https://ytmp3-backend-ux1x.onrender.com"; 

async function downloadMP3() {
  const url = document.getElementById("url").value.trim();
  const cookies = document.getElementById("cookies")?.value.trim() || ""; // optional
  const status = document.getElementById("status");

  if (!url) {
    status.innerText = "⚠️ Please enter a YouTube URL.";
    return;
  }

  status.innerText = "⏳ Downloading...";

  try {
    const response = await fetch(`${apiBase}/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, cookies })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "Download failed");
    }

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    // Try to get filename from content-disposition header
    const disposition = response.headers.get("Content-Disposition");
    let filename = "audio.mp3";
    if (disposition && disposition.includes("filename=")) {
      filename = disposition.split("filename=")[1].replace(/"/g, "");
    }

    link.download = filename;
    link.click();

    status.innerText = "✅ Download complete!";
  } catch (error) {
    console.error(error);
    status.innerText = "❌ Error: " + error.message;
  }
}
