function loadSvg(url) {
  const xhr = new XMLHttpRequest();
  const promise = new Promise((resolve, reject) => {
    xhr.onload = () => {
      const content = xhr.responseXML.documentElement;
      resolve(content);
    };
    xhr.onerror = () => reject(xhr.statusText);
  });
  xhr.open("GET", url);
  xhr.send();
  return promise;
}

loadSvg("https://rawgit.com/AttilaVM/465959c9d5a2ed9261fbee3c2333dabc/raw/0b20a90c132cb45d85191ca5004ddbe704e6f619/button.svg")
  .then((svg) => {
    let state = 0;
    const buttonBox = document.getElementById("button-box");
    button.attach(
      svg,
      buttonBox,
      {subElementIds: ["hamburger1", "hamburger2"],
       onMouseDown: function (e, subElements, svg) {

	       subElements.hamburger1.classList.add("scaleUp");
       },
       onMouseUp: function (e, subElements, svg) {

         subElements.hamburger1.classList.remove("scaleUp");
         if (state === 0) {
           state = 1;
           subElements.hamburger1.classList.add("rotateLeft");
           subElements.hamburger2.classList.add("rotateRight");
         }
         else {
           state = 0;
           subElements.hamburger1.classList.remove("rotateLeft");
	         subElements.hamburger2.classList.remove("rotateRight");
         }
       }
      }
    );
  });
