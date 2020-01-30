module.exports = (content, page, limit) => {
  page = parseInt(page, 10)
  limit = parseInt(limit, 10)

  const start = (page - 1) * limit
  const end = page * limit

  const results = {}

  results.count = content.length
  results.data = content.slice(start, end)
  return results
}
