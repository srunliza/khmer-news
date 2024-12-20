var data = [];

// Get Menu Bar
const getMenu = async () => {
    let url = "https://reanweb.com/api/teaching/get-menu.php";
    let rp = await fetch(url);
    let rq = await rp.json();
    console.log(rq);
    let txt = `<li>
                    <a class='m1 active' data-mid="0"><i class="fa-solid fa-house"></i></a>
                </li>
            `;
    rq.forEach((el) => {
        txt += `
            <li>
                <a class='m1' data-mid="${el.id}">${el.name}</a>
            </li>
        `;
    });

    // For Filter And Active
    document.querySelector(".menu").children[0].innerHTML = txt;
    const m1 = document.querySelectorAll(".m1");
    m1.forEach(el => {
        el.addEventListener("click", function () {
            m1.forEach(el3 => {
                el3.classList.remove("active");
            })
            el.classList.add("active");
            if (el.dataset.mid == 0) {
                displayNews(data);
            } else {
                const dataNewsFilter = data.filter(el2 => el2.mid == el.dataset.mid)
                displayNews(dataNewsFilter);
            }

        })
    })
};
getMenu();

// Get Content Card
const getNewsCard = async () => {
    let url = "https://reanweb.com/api/teaching/get-news.php";
    let rs = await fetch(url);
    data = await rs.json();
    console.log(data);
    displayNews(data);
};


// Get Detail News
const getNewsDetail = async(id) =>{
    let url = `https://reanweb.com/api/teaching/get-news-detail.php?id=${id}`
    let rs = await fetch(url);
    let rq = await rs.json();
    return rq;
}


// For Display Data News
function displayNews(rs) {
    let txt = "";
    rs.forEach(el => {
        txt += `
            <div class="col-xxl-3 col-xl-3 item-box">
                <div class="box newsBox" data-id="${el.id}">
                    <div class="img">
                        <img src="${el.img}" alt="">
                    </div>
                    <p>${el.title}</p>
                </div>
            </div>
        
        `
    });
    document.querySelector("#news-card").innerHTML = txt;

    // For Display Data News Details
    const newsBox = document.querySelectorAll(".newsBox")
    newsBox.forEach(el => {
        el.addEventListener("click", async function () {
            // console.log(el.dataset.id)
            const data = await getNewsDetail(el.dataset.id);
            console.log(data);
            // const detail = data.filter(el2 => el2.id == el.dataset.id)
            // console.log(detail[0].des)

            let txt = `
                <div class="col-xxl-9 col-xl-9 detail-box">
                    <h1>${data.title}</h1>
                    <p>${data.des}</p>
                </div>
            `

            document.getElementById("news-card").innerHTML = txt;
        });


    })

}
getNewsCard();
