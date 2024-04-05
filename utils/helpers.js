module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.8) {
      return `<span for="img" aria-label="headphotos">🎧</span>`;
    } else if (randomNum > 0.6) {
      return `<span for="img" aria-label="phone">📱</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else if (randomNum > 0.2) {
      return `<span for="img" aria-label="nerd">🤓</span>`;
    } else {
      return `<span for="img" aria-label="books">📚</span>`;
    }
  },
};
