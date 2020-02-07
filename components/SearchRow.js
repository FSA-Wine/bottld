import React, { Component } from 'react'
//import Link from 'next/link'
import { Grid } from 'semantic-ui-react'

class SearchRow extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <div>
              <h3>Find your next match:</h3>
            </div>
          </Grid.Row>
          <Grid.Row>
            <Grid centered stackable columns={3}></Grid>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default SearchRow
