let product = document.getElementById("product")
let form = document.getElementById("form")
let productName = document.getElementById("productName")
let productImage = document.getElementById("productImage")
let productPrice = document.getElementById("productPrice")
let listProduct = document.getElementById("listProduct")
form.addEventListener("submit", getForm)
// Form
async function getForm(e) {
    e.preventDefault()
    let data = {
        title: productName.value,
        image: productImage.value,
        price: productPrice.value
    }
    console.log(data);
    await axios.post("https://6589aaa6324d4171525951a6.mockapi.io/user/product", data)
        .then(() => {
            tableGet()
            addPage()
        })
}
// Table form
async function tableGet() {
    listProduct.innerHTML = ""
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            let db = res.data
            db.forEach((item) => {
                let tr = document.createElement("tr")
                tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.price} $</td>
        <td><div class="img">${item.image}<div/></td>
        <td><button onclick="rmvFunc(${item.id})"><i class="fa-solid fa-trash"></i> Remove</button></td>
        `
                listProduct.appendChild(tr)
            })
        })
}
tableGet()
// Search func
let srcItem = document.getElementById("srcItem")
let inp = document.getElementById("inp")
srcItem.addEventListener("submit", srcFunc)
async function srcFunc(e) {
    e.preventDefault()
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            let db = res.data
            let data = db.filter((item) => item.title.toLowerCase().includes(inp.value.toLowerCase()))
            display(data)
            inp.value = ``
        })
}
// SORT
let max = document.getElementById("max")
let min = document.getElementById("min")
let abc = document.getElementById("abc")
let cba = document.getElementById("cba")
let dflt = document.getElementById("dflt")

max.addEventListener("click", maxFunc)
min.addEventListener("click", minFunc)
abc.addEventListener("click", abcFunc)
cba.addEventListener("click", cbaFunc)
dflt.addEventListener("click", addPage)

async function maxFunc() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            db = res.data
            let data = db.sort((a, b) => (b.price - a.price))
            display(data)
        })
        .catch((err) => console.log(err))
}
async function minFunc() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            db = res.data
            let data = db.sort((a, b) => (a.price - b.price))
            display(data)
        })
        .catch((err) => console.log(err))
}

async function abcFunc() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            db = res.data
            let data = db.sort((a, b) => (a.title.localeCompare(b.title)))
            display(data)
        })
        .catch((err) => console.log(err))
}
async function cbaFunc() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            db = res.data
            let data = db.sort((a, b) => (b.title.localeCompare(a.title)))
            display(data)
        })
        .catch((err) => console.log(err))
}



async function rmvFunc(id) {
    try {
        await axios.delete(`https://6589aaa6324d4171525951a6.mockapi.io/user/product/${id}`)
            .then(() => {
                addPage()
                tableGet()
            })
    }
    catch (error) {
        console.log(error);
    }
}

async function addPage() {
    product.innerHTML = ""
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/product")
        .then((res) => {
            data = res.data
            display(data)
        })
        .catch((err) => console.log(err))
}
addPage()

function display(data) {
    product.innerHTML = ""
    data.forEach((item) => {
        let div = document.createElement("div")
        div.className = "box"
        div.innerHTML = `
        <img src="${item.image}" alt="">
        <p>${item.title}</p>
        <h6>${item.price} $</h6>
        <button onclick="rmvFunc(${item.id})"><i class="fa-solid mx-2 fa-trash"></i>Remove to cart</button>
`
        product.appendChild(div)
    })
}