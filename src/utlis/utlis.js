export const getUniqueId = () =>
  `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
export const sendRequest = async (data) => {
  const response = await fetch(data.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data.body,
  });
  return response.json();
};
