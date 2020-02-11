import React from 'react'
import { Card, List } from 'semantic-ui-react'
import WineListItem from './WineListItem'

export default ({ wines, view }) => (
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
      {/* {wines.lengthwines.length < 5 ? ( */}
      <div>
        <h3
          style={{
            fontStyle: `italic`,
            marginBottom: `15px`,
            marginTop: `15px`,
            textAlign: `center`,
          }}>
          {!wines.length
            ? `Like some wines to get started!`
            : wines.length < 5
            ? `Like ${5 - wines.length} more wines to improve your recommendations!`
            : ''}
        </h3>
      </div>
      {/* ) : (
        <></>
      )} */}
    </List>
  </Card>
)
