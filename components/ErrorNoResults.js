import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const ErrorNoResults = () => {
  return (
    <Grid centered>
      <Grid.Row computer={8} tablet={5} style={{ paddingBottom: `0` }}>
        <h2
          style={{
            textAlign: `center`,
            color: `#980000`,
            fontFamily: `Playfair Display, serif`,
            fontStyle: `italic`,
            fontSize: `2.3rem`,
            padding: `0`,
          }}>
          What a sophisticated palate you have.
        </h2>
      </Grid.Row>

      <Grid.Row>
        <h4
          style={{
            fontStyle: `italic`,
            letterSpacing: `.1px`,
            fontSize: `1.2rem`,
            fontFamily: `Lato, serif`,
            fontWeight: `400`,
          }}>
          {`None of our wines met your specifications—`}
          <br />
          {`please search again.`}
        </h4>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column computer={2} tablet={3}>
          <Image centered src="./glass-grapes.svg"></Image>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default ErrorNoResults
