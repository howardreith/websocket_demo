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
  return result.json();
}

export async function sendMessage({ username, message }) {
  await fetch(`${backendUrl}/sendMessage`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      username,
    }),
  });
}
