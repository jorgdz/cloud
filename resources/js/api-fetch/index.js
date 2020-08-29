module.exports = function apiFetch (url, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, options)
      const body = await response.json()

      if (!response.ok) {
        const fail = {
          status: response.status,
          url: response.url,
          response: body,
          statusText: response.statusText,
          headers: response.headers,
          text: response.text
        }
        reject(fail)
      } else {
        resolve(body)
      }
    } catch (err) {
      reject(err)
    }
  })
}
