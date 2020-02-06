import React from 'react'
import { Divider, Image, List } from 'semantic-ui-react'
import heartOutline from './heart-outline.svg'
import heartSolid from './heart-solid.svg'

//need to hook up heart toggle func

//Link on ea wine Item
//hover on item = shading
//change Link default color with 'a' selector

const WineListItem = ({ name, variety }) => {
  return (
    <List.Item className="hand-cursor">
      <List.Content>
        <div className="list-body">
          <List.Description>
            <strong>{name}</strong>
            <Image
              style={{ width: `18px`, margin: `5px 5px 0 0` }}
              src={heartOutline}
              floated="right"
              verticalAlign="bottom"
            />
          </List.Description>
          <List.Description className="description">{variety}</List.Description>
        </div>
        <Divider section style={{ margin: `5px 0 0 0` }} />
      </List.Content>
    </List.Item>
  )
}

export default WineListItem
