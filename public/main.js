var removeAll = document.getElementsByClassName("remove")[0];
console.log("this is remove all", removeAll)
var itemRemovelist = document.getElementsByClassName("itemHolder");



Array.from(itemRemovelist).forEach(function(element) {
      element.addEventListener('click', function(){
        const toDolistitem = element.innerText
        console.log("to list item", toDolistitem)

        fetch('toDo', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'toDoitem': toDolistitem,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
removeAll.addEventListener('click', function(){
  console.log("about to remove all")

  fetch('toDoall', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },

  }).then(function (response) {
    window.location.reload()
  })
});
