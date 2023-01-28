fetch('./navbar.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector("#nav-placeholder").innerHTML = data;
  });
