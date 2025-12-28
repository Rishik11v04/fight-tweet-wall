const feed = document.getElementById("feed");
const tweetInput = document.getElementById("tweetInput");
const tweetButton = document.querySelector(".tweet-box button");

const API = "http://localhost:3000";

// -----------------------------
// LOAD TWEETS
// -----------------------------
window.onload = async () => {
  const res = await fetch(`${API}/tweets`);
  const tweets = await res.json();

  feed.innerHTML = "";

  // Backend sends newest → oldest
  tweets.forEach(tweet => {
    renderTweet(tweet, false);
  });
};

// -----------------------------
// POST NEW TWEET
// -----------------------------
tweetButton.addEventListener("click", async () => {
  const text = tweetInput.value.trim();
  if (!text) return;

  const res = await fetch(`${API}/tweet`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const savedTweet = await res.json();

  renderTweet(savedTweet, true);
  tweetInput.value = "";
});

// -----------------------------
// RENDER TWEET
// -----------------------------
function renderTweet(tweet, isNew) {
  const div = document.createElement("div");
  div.className = "tweet";

  const p = document.createElement("p");
  p.innerText = tweet.text;

  const time = document.createElement("div");
  time.className = "time";
  time.innerText = formatTime(tweet.createdAt);

  // DELETE BUTTON
  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.innerText = "🗑";

  delBtn.onclick = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this tweet?"
    );
    if (!confirmDelete) return;

    await fetch(`${API}/tweet/${tweet._id}`, {
      method: "DELETE"
    });

    div.remove();
  };

  div.appendChild(delBtn);
  div.appendChild(p);
  div.appendChild(time);

  if (isNew) {
    feed.prepend(div);
  } else {
    feed.appendChild(div);
  }
}

// -----------------------------
// FORMAT TIME
// -----------------------------
function formatTime(dateString) {
  return new Date(dateString).toLocaleString();
}
