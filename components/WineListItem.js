import React from 'react'
import { Divider, Image, List } from 'semantic-ui-react'
import Link from 'next/link'
// import heartOutline from '../public/heart-outline.svg'
// import heartSolid from '../public/heart-solid.svg'

//need to hook up heart toggle func

//Link on ea wine Item
//hover on item = shading
//change Link default color with 'a' selector

const WineListItem = ({ wineProps }) => {
  if (wineProps) {
    return (
      <List.Item className="hand-cursor">
        <List.Content>
          <div className="list-body">
            <List.Description>
              <Link href="/wines/[id]" as={`/wines/${wineProps.id.low}`}>
                <a>
                  <strong>{wineProps.title}</strong>
                </a>
              </Link>
              <Image
                style={{ width: `18px`, margin: `5px 5px 0 0` }}
                src="/heart-solid.svg"
                floated="right"
                verticalAlign="bottom"
              />
            </List.Description>
            <List.Description className="description">{wineProps.variety}</List.Description>
          </div>
          <Divider section style={{ margin: `5px 0 0 0` }} />
        </List.Content>
      </List.Item>
    )
  } else return <div></div>
}

export default WineListItem
