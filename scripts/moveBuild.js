const fs = require("fs-extra");

async function moveBuildFolder() {
  try {
    await fs.move("frontend/build", "backend/src/public", { overwrite: true });
    console.log("Build folder moved successfully!");
  } catch (err) {
    console.error("Error moving build folder:", err);
    process.exit(1); // Hata durumunda süreci durdur
  }
}

moveBuildFolder();
