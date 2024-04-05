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

const goBlogpostHandler = async (event) => {
  document.location.replace('/blogpost');
};

document
  .querySelector('.post1')
  .addEventListener('click', goBlogpostHandler);

let el1 = document
  .querySelector('.post-delete');
if (el1) {
  document
    .querySelector('.post-delete')
    .addEventListener('click', delButtonHandler);
};

let el2 = document
  .querySelector('.post2');
if (el2) {
  document
    .querySelector('.post2')
    .addEventListener('click', goBlogpostHandler);
};
