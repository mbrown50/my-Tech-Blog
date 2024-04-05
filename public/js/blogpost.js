const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog post');
    }
  }
};

const goDashboardHandler = async (event) => {
  document.location.replace('/dashboard');
};

document
  .querySelector('.new-blog-form')
  .addEventListener('click', newFormHandler);

document
  .querySelector('.blog-cancel')
  .addEventListener('click', goDashboardHandler);
