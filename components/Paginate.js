import React from 'react'
import { Pagination } from 'semantic-ui-react'

const Paginate = props => {
  const handlePaginationChange = (e, { activePage }) => {
    props.setPage(activePage)
  }

  return (
    <div className="centered-parent">
      <Pagination
        className="paginate"
        defaultActivePage={1}
        totalPages={Math.ceil(props.count / props.limit)}
        onPageChange={handlePaginationChange}
        firstItem={null}
        lastItem={null}
        pointing
        secondary
      />
    </div>
  )
}

export default Paginate
