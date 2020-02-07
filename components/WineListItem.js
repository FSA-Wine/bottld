import React from 'react'
import { Divider, Image, List } from 'semantic-ui-react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { likeWine } from '../store/user'
// import heartOutline from '../public/heart-outline.svg'
// import heartSolid from '../public/heart-solid.svg'

//need to hook up heart toggle func

//Link on ea wine Item
//hover on item = shading
//change Link default color with 'a' selector

const WineListItem = ({ wineProps, liked, likeWine, user }) => {
  const onLike = () => {
    likeWine(liked, user, wineProps)
    liked = !liked
  }

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
                src={liked ? '/heart-solid.svg' : '/heart-outline.svg'}
                onClick={() => onLike()}
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

const mapState = state => ({
  user: state.user,
})

const mapDispatch = {
  likeWine,
}

export default connect(mapState, mapDispatch)(WineListItem)
