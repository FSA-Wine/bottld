import React from 'react'
import { Image } from 'semantic-ui-react'

let countryFlag = country => {
  switch (country) {
    case 'US':
      return '/US_flag.svg'
      break
    case 'Italy':
      return '/Italy_flag.svg'
      break
    case 'Australia':
      return '/Australia_flag.svg'
      break
    case 'German':
      return '/German_flag.svg'
      break
    case 'Spain':
      return '/Spain_flag.svg'
      break
    case 'Turkey':
      return '/Turkey_flag.svg'
      break
    case 'Greece':
      return '/Greece_flag.svg'
      break
    case 'Austria':
      return '/Austria_flag.svg'
      break
    case 'Chile':
      return '/Chile_flag.svg'
      break
    case 'Canada':
      return '/Canada_flag.svg'
      break
    case 'South Africa':
      return '/SouthAfrica_flag.svg'
      break
    default:
      return 'https://react.semantic-ui.com/images/wireframe/square-image.png'
  }
}

const SingleWineMap = props => {
  console.log('props?', props)
  return (
    <Image
      style={{ width: `13%`, padding: `15px` }}
      src={countryFlag(props.singleWine.country)}
      //   size="mini"
      centered
      circular
    />
  )
}

export default SingleWineMap
