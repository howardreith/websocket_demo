const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function signInWithUsername(username) {
  const result = await fetch(`${backendUrl}/signin`, {
    method: 'post',
    headers: {
      'Content-type': 'application/JSON',
      body: JSON.stringify({
        username,
      }),
    },
  });
  return result.json();
}
