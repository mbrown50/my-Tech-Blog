const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  if (title && description) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit blog post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

const goDashboardHandler = async (event) => {
  document.location.replace('/dashboard');
};

let el1 = document
  .querySelector('.blog-edit');
document
  .querySelector('.blog-edit')
  .addEventListener('click', editFormHandler);

let el2 = document
  .querySelector('.blog-delete');
document
  .querySelector('.blog-delete')
  .addEventListener('click', delButtonHandler);

let el3 = document
  .querySelector('.blog-cancel');
document
  .querySelector('.blog-cancel')
  .addEventListener('click', goDashboardHandler);