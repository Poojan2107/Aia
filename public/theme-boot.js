(function () {
  try {
    var k = "aia-theme";
    var q = new URLSearchParams(location.search).get("theme");
    var t =
      q === "blue" || q === "orange"
        ? q
        : localStorage.getItem(k);
    if (t === "blue" || t === "orange") {
      document.documentElement.dataset.theme = t;
    } else {
      document.documentElement.dataset.theme = "orange";
    }
  } catch (e) {
    document.documentElement.dataset.theme = "orange";
  }
})();
