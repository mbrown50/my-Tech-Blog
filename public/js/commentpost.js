const newFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-comment').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const blog_id = event.target.getAttribute('data-id');
    const user_id = event.target.getAttribute('data-user')

    if (comment) {
      const response = await fetch(`/api/comments/` + blog_id , { 
        method: 'POST',
        body: JSON.stringify({ comment, blog_id, user_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create comment post');
      }
    }
  };
}

const goDashboardHandler = async (event) => {
  document.location.replace('/dashboard');
};

document
  .querySelector('.new-comment-form')
  .addEventListener('click', newFormHandler);

document
  .querySelector('.comment-cancel')
  .addEventListener('click', goDashboardHandler);
