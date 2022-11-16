export const getAllPostsService = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/photos`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getSinglePostService = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/photos/${id}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const signupUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const getMyDataService = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getUserDataService = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/${id}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getUserPostsService = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/photos/user/${id}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const logInUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const sendPostService = async ({ data, token }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/photos`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const deletePostService = async ({ id, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/photo/:${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const likePostService = async ({ data, token, id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/photos/:${id}/like`,
    {
      method: "GET",
      body: data,
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
