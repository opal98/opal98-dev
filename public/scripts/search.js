
document // makes it so you can press enter to submit as opposed to just being able to press a button
    .getElementById("urlInput")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    });

document.getElementById("searchButton").onclick = function (event) {
    event.preventDefault();

    let url = document.getElementById("urlInput").value; // if no periods are detected in the input, search google instead
    let searchUrl = "https://www.google.com/search?q=";

    if (!url.includes(".")) {
        url = searchUrl + encodeURIComponent(url);
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) { // if no http or https is detected, add https automatically
            url = "https://" + url;
        }
    }

    iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
};

// // Searching 

// const form = document.querySelector("form");
// const input = document.querySelector("input");

// form.addEventListener("submit", async (event) => {
//     console.log("IT WORKS")
//   event.preventDefault();
//   window.navigator.serviceWorker
//     .register("./sw.js", {
//       scope: __uv$config.prefix,
//     })
//     .then(() => {
//       let url = input.value.trim();
//       if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
//       else if (!(url.startsWith("https://") || url.startsWith("http://")))
//         url = "http://" + url;
//       sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
//       location.href = "go";
//     });
// });


// function go(value) {
//     let iframe = document.querySelector(".iframe.active");
//     window.navigator.serviceWorker
//       .register("./sw.js", {
//         scope: __uv$config.prefix,
//       })
//       .then(() => {
//         let url = value.trim();
//         if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
//         else if (!(url.startsWith("https://") || url.startsWith("http://")))
//           url = "https://" + url;
//         //pass the encoded url to the second page
//         sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
//         location.href = "go";
//       });
//   }
  
//   function blank(value) {
//     let iframe = document.querySelector(".iframe.active");
//     window.navigator.serviceWorker
//       .register("./sw.js", {
//         scope: __uv$config.prefix,
//       })
//       .then(() => {
//         let url = value.trim();
//         if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
//         else if (!(url.startsWith("https://") || url.startsWith("http://")))
//           url = "https://" + url;
//         window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
//       });
//   }
  
//   function isUrl(val = "") {
//     if (
//       /^http(s?):\/\//.test(val) ||
//       (val.includes(".") && val.substr(0, 1) !== " ")
//     )
//       return true;
//     return false;
//   }

