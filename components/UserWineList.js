import React from 'react'
import { Card, List } from 'semantic-ui-react'
import WineListItem from './WineListItem'

export default ({ wines, view }) => {
  if (wines.length > 4) {
    return (
      <Card className="lists" style={{ width: `100%` }}>
        <List divided selection relaxed style={{ padding: `14px, 0` }}>
          {wines.map((wine, i) => {
            return (
              <div key={i}>
                <WineListItem
                  wineProps={wine._fields[0].properties}
                  liked={view === 'likedWines' ? true : false}
                />
              </div>
            )
          })}
        </List>
      </Card>
    )
  } else if (wines.length && wines.length < 5) {
    return (
      <Card className="lists" style={{ width: `100%` }}>
        <List divided selection relaxed style={{ padding: `14px, 0` }}>
          {wines.map((wine, i) => {
            return (
              <div key={i}>
                <WineListItem
                  wineProps={wine._fields[0].properties}
                  liked={view === 'likedWines' ? true : false}
                />
              </div>
            )
          })}
          <div>
            <h3
              style={{
                fontStyle: `italic`,
                marginBottom: `20px`,
                marginTop: `45%`,
                textAlign: `center`,
              }}>
              {`Like ${5 - wines.length} more wines to improve your recommendations!`}
            </h3>
          </div>
        </List>
      </Card>
    )
  } else {
    return (
      <div>
        <h3 style={{ fontStyle: `italic` }}>Like some wines to get started!</h3>
      </div>
    )
  }
}
