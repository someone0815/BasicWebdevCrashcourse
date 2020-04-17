// import axios from 'axhios';

const url = 'https://jsonplaceholder.typicode.com/';

// GET REQUEST
function getTodos() {
  // long way of doing it
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   .catch((err) => console.error(res));

  axios
    .get(url + 'todos?limit=5') //get by default
    .then((res) => showOutput(res))
    .catch((err) => console.error(res));
}

// POST REQUEST
function addTodo() {
  axios
    .post(url + 'todos', {
      title: 'New Todo',
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(res));
}

// PUT(meant to replace entire resource)/PATCH(update incrementally) REQUEST
function updateTodo() {
  axios
    // .put('https://jsonplaceholder.typicode.com/todos/1', { // now userID is gone
    .patch(url + 'todos/1', {
      // userID still there
      title: 'Updated Todo',
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(res));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete(url + 'todos/1')
    .then((res) => showOutput(res))
    .catch((err) => console.error(res));
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([axios.get(url + 'todos?_limit=5'), axios.get(url + 'posts?_limit=5')])
    .then(
      //   (res) =>{console.log(res[0]);
      //   console.log(res[1]);
      //   showOutput(res[1]);}
      axios.spread((todos, posts) => showOutput(posts))
    )
    .catch((err) => console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
