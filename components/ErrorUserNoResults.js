import React from 'react'
import { Grid } from 'semantic-ui-react'

const ErrorUserNoResults = () => {
  return (
    <Grid.Column centered>
      <h2
        style={{
          textAlign: `center`,
          color: `#980000`,
          fontFamily: `Playfair Display, serif`,
          fontStyle: `italic`,
          fontSize: `1.5rem`,
          marginBottom: `0`,
        }}>
        No recommendations (yet).
      </h2>
      <h4
        style={{
          textAlign: `center`,
          fontStyle: `italic`,
          letterSpacing: `.1px`,
          //   fontSize: `1.2rem`,
          fontFamily: `Lato, serif`,
          fontWeight: `400`,
          marginTop: `5px`,
        }}>
        Please Like additional wines or expand your search
        <br />
        so we can make some recommendations for you.
      </h4>
    </Grid.Column>
  )
}

export default ErrorUserNoResults
