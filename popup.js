document.addEventListener("DOMContentLoaded", function() {
    const bookmarkButton= document.getElementById("bookmarkButton");
  
    bookmarkButton.addEventListener("click",function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        const title = currentTab.title;
        const url = currentTab.url;
        
        if(url=="chrome://newtab/"){
            alert("invalid");
            return;
        }

        chrome.bookmarks.search({}, (bookmarks) => {
            const bookmarkUrls = new Set();

            bookmarks.forEach((bookmark) => {
                if(bookmarkUrls.has(bookmark.url)){
                    alert("already present");
                    return;
                }
            });
        });

        async function b(){
            try{
            await chrome.bookmarks.create({ title, url });
            alert("page bookmarked");
            }
            catch(e){
                console.log(e+"error");
            }
        }

        // chrome.bookmarks.create({ title, url }, function() {
        //   alert("Page bookmarked");


        
        // });
        b();
       });

     });
});
  