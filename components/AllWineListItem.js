import React, { useState } from 'react'
import { Divider, Image, List, Popup } from 'semantic-ui-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { likeWine } from '../store/user'
// import heartOutline from '../public/heart-outline.svg'
// import heartSolid from '../public/heart-solid.svg'

//need to hook up heart toggle func

//Link on ea wine Item
//hover on item = shading
//change Link default color with 'a' selector

const AllWineListItem = ({ wineProps, liked, isLoggedIn }) => {
  const [isLiked, setIsLiked] = useState(liked)
  const dispatch = useDispatch()
  const onLike = () => {
    if (isLoggedIn) {
      dispatch(likeWine(isLiked, wineProps))
      setIsLiked(!isLiked)
    }
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
              <Popup
                content={
                  isLiked
                    ? 'You like this wine'
                    : isLoggedIn
                    ? 'Add to Liked Wines'
                    : 'Please log in to like this wine'
                }
                trigger={
                  <Image
                    src={isLiked ? '/heart-solid.svg' : '/heart-outline.svg'}
                    style={{ width: `18px`, margin: `5px 5px 0 0` }}
                    onClick={() => onLike()}
                    floated="right"
                    verticalAlign="bottom"
                  />
                }
                position={'right center'}
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

export default AllWineListItem
