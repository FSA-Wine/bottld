import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const ErrorLogIn = () => {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={6}>
          <h2
            style={{
              textAlign: `center`,
              color: `#980000`,
              fontFamily: `Playfair Display, serif`,
              fontWeight: `700`,
              fontStyle: `italic`,
              fontSize: `2.3rem`,
              marginBottom: `0`,
            }}>
            {`Let's see some ID.`}
          </h2>
          <h4
            style={{
              textAlign: `center`,
              fontStyle: `italic`,
              letterSpacing: `.1px`,
              fontSize: `1.2rem`,
              fontFamily: `Lato, serif`,
              fontWeight: `400`,
              marginTop: `5px`,
            }}>
            Please log in to access this page.
          </h4>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={2}>
          <Image centered src="./bottles-stemless-glass.svg"></Image>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default ErrorLogIn
