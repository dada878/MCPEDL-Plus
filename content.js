// // 監聽網頁中點擊右鍵的事件
// document.addEventListener('contextmenu', event => {
//     // 將被點擊的照片元素存在 clickedImg 變數中
//     let clickedImg = event.target
// })

// // 監聽來自 background.js 傳遞訊息的請求事件
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     // 驗證訊息內容，並產生 URL 報表 code...
//     // 操作 DOM，將報表覆寫在原本的網頁中 code...
// })

// var path = chrome.extension.getURL('content.css');
// $('head').append($('<link>')
//     .attr("rel", "stylesheet")
//     .attr("type", "text/css")
//     .attr("href", path));
// const posts = $(".post");
// for (let i = 0; i < posts.length; i++) {
//     const postElement = $(posts[i]);
//     console.log(postElement);
//     postElement.on("click", function() {
//         console.log("click")
//         // postElement.find("a").trigger("click");
//     });
// }

// let url = location.href;
// setInterval(() => {
//     if (url != location.href) {
//         url = location.href;
//         console.log("change page");
//         addItemsClickEvent();
//         setTimeout(addItemsClickEvent, 1000);
//     }
// }, 100);

function addItemsClickEvent() {
    const posts = $(".post");
    for (let i = 0; i < posts.length; i++) {
        const postElement = $(posts[i]);
        postElement.off("click");
        postElement.on("click", function (e) {
            console.log("click")
            const linkElement = postElement.find("a");
            if ($(e.target).is($(linkElement[0]))) return;
            linkElement[0].click();
        });
    }
}

setInterval(addItemsClickEvent, 100);

// $(document).on("scorll", () => {

// });

let pageCache = "";
setTimeout(() => {
    document.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scorllTop = document.documentElement.scrollTop + document.documentElement.clientHeight * 2.5;
        if (scrollHeight - scorllTop < 0) {
            const nextPageUrl = $(".next-page").attr("href");
            if (!nextPageUrl) return;
            $(".navigate-page").remove();
            pageCache = nextPageUrl;
            $.get(nextPageUrl, (data, textStatus, jqXHR) => {
                const nextPageAddons = $(data).find("#wrap-content").children();
                for (let i = 0; i < nextPageAddons.length; i++) {
                    const nextPageAddonElement = $(nextPageAddons[i]).html($(nextPageAddons[i]).html().replaceAll("data-src", "src"))
                    $("#wrap-content").append(nextPageAddonElement);
                }
            });
        }
    }, true);
}, 1000);