let questions = [];
let scores = [];

let currentQuestion = [];

let p = 0; // percent
let totalQL = 0; // total question length

let tbl;

window.onload = async () => {
  questions = await fetch("questions.json").then(res => res.json())
  scores = await fetch("scores.json").then(res => res.json())

  totalQL = questions.length
  tbl = $("#tabelhasil")
}

const $ = document.querySelector.bind(document)

function mulai() {
  $("#permulaan").classList.add("hidden")
  //$("#title").classList.add("hidden")
  rollQ()
}

function answer(j) {
  switch(j) {
    case "Ya":
      calc(currentQuestion[1])
      break
    case "Tidak":
      break
    case "Kadang":
    case "Jarang":
      calc(currentQuestion[1]/2)
      break
  }

  addToTable(currentQuestion[0], j)
  rollQ()
}

function rollQ() {
  if (questions.length == 0) {
    showResult()
    return
  }

  let randomIndx = Math.floor(Math.random() * questions.length)
  currentQuestion = questions[randomIndx]

  yeetQ(randomIndx)

  $("#no_pertanyaan").innerText = totalQL - questions.length
  $("#pertanyaandiv").classList.remove("hidden")
  askPertanyaan(currentQuestion[0])
}

function askPertanyaan(q) { // q -> string
  $("#pertanyaan").innerText = "";
  $("#jawabandiv").classList.add("hidden")
  q = q.split("")

  let str = "";

  let meint = setInterval(() => {
    if (q.length < 1) {
      $("#jawabandiv").classList.remove("hidden")
      clearInterval(meint)
      return
    }

    str += q.shift()
    $("#pertanyaan").innerText = str
  }, 70)
}

function showResult() {
  $("#pertanyaandiv").classList.add("hidden")
  $("#persen").innerText = p

  $("#hasil").innerText = scores[0][1]

  for (let i = scores.length-1; i >= 0; i--) {
    if (p >= scores[i][0]) {
      $("#hasil").innerText = scores[i][1]
      break
    }
  }
  
  $("#hasildiv").classList.remove("hidden")
}

function yeetQ(indx) {
  questions[indx] = questions[questions.length-1]
  questions.pop()
}

function calc(answ) { // answ -> int
  p += answ
}

function addToTable(q, a) { // q, a -> string
  const row = document.createElement("tr")

  const qC = document.createElement("td")
  const aC = document.createElement("td")

  qC.appendChild(document.createTextNode(q))
  aC.appendChild(document.createTextNode(a))

  row.appendChild(qC)
  row.appendChild(aC)

  tbl.appendChild(row)
}
