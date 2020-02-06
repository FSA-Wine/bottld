import React from 'react'
import { Card, List } from 'semantic-ui-react'
import WineListItem from './WineListItem'

//for Liked and Tried Wines

;<ul>
  {!props.user[view] ? (
    <li>Nothing!</li>
  ) : (
    props.user[view].map(wine => {
      const wineProps = wine._fields[0].properties
      return (
        <div>
          <Link href="/wines/[id]" as={`/wines/${wineProps.id.low}`} key={wineProps.id.low}>
            <a className="card">
              <li>{wineProps.title}</li>
            </a>
          </Link>
        </div>
      )
    })
  )}
</ul>

const UserLists = ({ wines }) => {
  if (wines.length) {
    return (
      <Card className="lists" style={{ width: `100%` }}>
        <List divided selection relaxed style={{ padding: `14px, 0` }}>
          {wines.map((wine, i) => {
            return (
              <div key={i}>
                <WineListItem {...wine} />
              </div>
            )
          })}
        </List>
      </Card>
    )
  } else {
    return <div></div>
  }
}

export default UserLists
