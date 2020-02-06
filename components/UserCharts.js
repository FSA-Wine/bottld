import React, { Fragment } from 'react'
import UserFlavorChart from './UserFlavorChart'

const UserCharts = () => {
  return (
    <Fragment>
      <div className="chart-container">
        <p className="sm-gray">FLAVOR PROFILE</p>
        <div className="polar-container">
          <UserFlavorChart />
        </div>
      </div>

      <div className="chart-container">
        <p className="sm-gray">FLAVOR PROFILE</p>
        <div className="polar-container">
          <UserFlavorChart />
        </div>
      </div>
    </Fragment>
  )
}

export default UserCharts
