const apiBase = "https://ytmp3-backend-ux1x.onrender.com"; 

async function downloadMP3() {
  const url = document.getElementById("url").value;
  const status = document.getElementById("status");

  if (!url) {
    status.innerText = "Please enter a YouTube URL.";
    return;
  }

  status.innerText = "Downloading...";

  try {
    const response = await fetch(`${apiBase}/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "audio.mp3";
    link.click();

    status.innerText = "Download complete ✅";
  } catch (error) {
    console.error(error);
    status.innerText = "Error: " + error.message;
  }
}

