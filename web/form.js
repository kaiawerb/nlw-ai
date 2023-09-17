import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  content.classList.add("placeholder")

  event.preventDefault()
  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent =
      "O vídeo não é um shorts! Escolha um vídeo valido.")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do aúdio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result

  content.classList.remove("placeholder")
})
