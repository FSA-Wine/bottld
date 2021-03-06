import React from 'react'
import { Card, List } from 'semantic-ui-react'
import AllWineListItem from './AllWineListItem'

export default ({ wines, isLoggedIn }) => {
  if (wines.length) {
    return (
      <Card className="lists" style={{ width: `100%` }}>
        <List divided selection relaxed style={{ padding: `14px, 0` }}>
          {wines.map((wine, i) => {
            return (
              <div key={i}>
                <AllWineListItem
                  wineProps={wine._fields[0].properties}
                  liked={wine._fields[1]}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            )
          })}
        </List>
      </Card>
    )
  } else {
    return <div>No wines to display</div>
  }
}
