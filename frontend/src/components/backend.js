const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function signInWithUsername(username) {
  const result = await fetch(`${backendUrl}/signin`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
    }),
  });
  return result.json().messages;
}

export async function getLast50Messages() {
  const result = await fetch(`${backendUrl}/last50messages`, {
    method: 'get',
  });
  return result.json();
}
