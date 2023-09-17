import ytdl from "ytdl-core"
import fs from "fs"
import { info } from "console"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("A duração do vídeo é maior que 60 segundos.")
        }
      })
      .on("end", () => {
        console.log(
          "Download do vídeo finalizado. O arquivo temporario foi salvo na pasta temporaria."
        )
        resolve()
      })
      .on("error", (error) => {
        console.log("Não foi possível fazer o download do vídeo | ERRO:", error)
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
