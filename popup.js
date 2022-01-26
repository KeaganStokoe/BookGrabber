// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
const setPageBackgroundColor = async () => {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
  var elements = document.getElementsByTagName("title");
  let title = elements[0].innerHTML;
  console.log(title);

  // make request to API
  let bookData = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${title}`
  );
  //use string literals
  let bookDataJson = await bookData.json();
  console.log(bookDataJson["items"][0]["volumeInfo"]);

  // The log above has the info you need so you can just make the Notion API post request now
};
