export const trimParen = title => {
  if (title.lastIndexOf('(') !== -1) {
    let sParenIdx = title.lastIndexOf('(')
    return title.slice(0, sParenIdx)
  } else {
    return title
  }
}

export const wineColor = color => {
  switch (color) {
    case 'red':
      return '#a61c00'
      break
    case 'white':
      return '#f1c232'
      break
    case 'rose':
      return '#ea9999'
      break
    default:
      return '#999999'
  }
}

export const scoreComment = score => {
  switch (true) {
    case score > 80 && score < 83:
      return 'Acceptable'
      break
    case score < 87:
      return 'Good'
      break
    case score < 90:
      return 'Very Good'
      break
    case score < 94:
      return 'Excellent'
      break
    case score < 98:
      return 'Superb'
      break
    case score < 101:
      return 'Classic'
      break
    default:
      return ''
  }
}

export const countryFlag = country => {
  switch (country) {
    case 'US':
      return '/US_flag.svg'
      break
    case 'Italy':
      return '/Italy_flag.svg'
      break
    case 'France':
      return '/France_flag.svg'
      break
    case 'Australia':
      return '/Australia_flag.svg'
      break
    case 'Germany':
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
    case 'Portugal':
      return '/Portugal_flag.svg'
      break
    case 'Argentina':
      return '/Argentina_flag.svg'
      break
    case 'New Zealand':
      return '/NewZealand_flag.svg'
      break
    case 'Brazil':
      return '/Brazil_flag.svg'
      break
    case 'Bulgaria':
      return '/Bulgaria_flag.svg'
      break
    case 'Croatia':
      return '/Croatia_flag.svg'
      break
    case 'Georgia':
      return '/Georgia_flag.svg'
      break
    case 'Romania':
      return '/Romania_flag.svg'
      break
    default:
      return 'https://react.semantic-ui.com/images/wireframe/square-image.png'
  }
}

export const wineImg = (color, id, label = '-label') => {
  const modular = id % 10
  return color
    ? `/photos/wine-${color}-${modular}${label}.png`
    : `/photos/wine-red-${modular}${label}.png`
}
