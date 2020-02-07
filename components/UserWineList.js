import React from 'react'
import { Card, List } from 'semantic-ui-react'
import WineListItem from './WineListItem'

export default ({ wines }) => {
  if (wines.length) {
    return (
      <Card className="lists" style={{ width: `100%` }}>
        <List divided selection relaxed style={{ padding: `14px, 0` }}>
          {wines.map((wine, i) => {
            return (
              <div key={i}>
                <WineListItem wineProps={wine._fields[0].properties} />
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
