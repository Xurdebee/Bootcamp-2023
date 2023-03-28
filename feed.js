const likeBtn = document.getElementById("boton_likes");
const likeCountElement = document.getElementById("like-count");
let likeCount = parseInt(likeCountElement.textContent);
likeBtn.addEventListener("click", function() {
  likeCount++;
  likeCountElement.textContent = likeCount.toString();
});