const form = document.querySelector("#editInventory")
    form.addEventListener("change", function () {
      const updateBtn = document.querySelector("#editInventory button")
      updateBtn.removeAttribute("disabled")
    })