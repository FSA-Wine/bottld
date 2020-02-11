// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// //import Link from 'next/link'
// import { Button, Dropdown, Grid, Input, Label } from 'semantic-ui-react'
// import {
//   flavors,
//   countryOptions,
//   varietyOptions,
//   colorOptions,
//   maxPriceOptions,
//   minPriceOptions,
// } from './dropdownOptions'
// import { fetchRecWines } from '../store/recommended'

// //setting initial state value for max & min as zero removed placeholder text "maximum" and "minimum"
// class SearchRow extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       limit: 5,
//       variety: '',
//       country: '',
//       flavor: '',
//       maxPrice: 99999,
//       minPrice: 0,
//     }
//   }

//   handleChange = evt => {
//     this.setState({
//       [evt.target.name]: evt.target.value,
//     })
//     this.props.fetchRecWines({
//       color: this.state.color,
//       country: this.state.country,
//       variety: this.state.variety,
//       priceLow: this.state.priceLow,
//       priceHigh: this.state.priceHigh,
//       limit: this.state.limit,
//     })
//   }

//   // handleSubmit = evt => {
//   //   evt.preventDefault()
//   //   //do something
//   //   this.setState({
//   //     variety: '',
//   //     country: '',
//   //     flavor: '',
//   //     maxPrice: '',
//   //     minPrice: '',
//   //   })
//   // }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <Grid>
//             <hr style={{ borderTop: `2px solid #BEBEBE`, width: `100%` }} />
//             <Grid.Row>
//               <div>
//                 <h3 style={{ fontStyle: `italic` }}>
//                   Make some selections to find your next match:
//                 </h3>
//               </div>
//             </Grid.Row>

//             {/* Top row of inputs */}
//             <Grid.Row centered columns={2} style={{ display: `flex` }}>
//               {/* value in Dropdown?? */}
//               <Grid.Column width={6} columns={2} style={{ display: `flex` }}>
//                 <h4 style={{ margin: `8px` }}> Variety</h4>
//                 <Dropdown
//                   clearable
//                   fluid
//                   search
//                   selection
//                   options={varietyOptions}
//                   onChange={this.handleChange}
//                   placeholder="Select Variety"
//                 />
//               </Grid.Column>

//               <Grid.Column width={6} columns={2} style={{ display: `flex` }}>
//                 <h4 style={{ margin: `8px` }}> Country</h4>
//                 <Dropdown
//                   clearable
//                   fluid
//                   search
//                   selection
//                   options={countryOptions}
//                   onChange={this.handleChange}
//                   placeholder="Select Country"
//                 />
//               </Grid.Column>
//             </Grid.Row>

//             {/* bottom row of inputs */}
//             <Grid.Row centered columns={2} style={{ display: `flex` }}>
//               <Grid.Column width={5} columns={2} style={{ display: `flex` }}>
//                 <h4 style={{ margin: `8px` }}> Flavor</h4>
//                 <Dropdown
//                   clearable
//                   fluid
//                   search
//                   selection
//                   options={flavors}
//                   onChange={this.handleChange}
//                   placeholder="Select Flavor"
//                 />
//               </Grid.Column>

//               <Grid.Column width={10} columns={3} style={{ display: `flex` }}>
//                 <h4 style={{ margin: `8px 0 8px 10px` }}> Price</h4>
//                 <Label
//                   basic
//                   horizontal
//                   style={{
//                     margin: `0 0 0 15px`,
//                     paddingTop: `.8em`,
//                     backgroundColor: `#E2E2E2`,
//                   }}>
//                   $
//                 </Label>
//                 <Input
//                   fluid
//                   placeholder="Min"
//                   style={{ width: `35%` }}
//                   value={this.state.minPrice}
//                   onChange={this.handleChange}
//                 />
//                 <Label
//                   style={{
//                     paddingTop: `.9em`,
//                     paddingLeft: `.3em`,
//                     backgroundColor: `transparent`,
//                   }}>
//                   .00
//                 </Label>

//                 <Label
//                   basic
//                   horizontal
//                   style={{
//                     margin: `0 0 0 15px`,
//                     paddingTop: `.9em`,
//                     backgroundColor: `#E2E2E2`,
//                   }}>
//                   $
//                 </Label>
//                 <Input
//                   fluid
//                   placeholder="Max"
//                   style={{ width: `35%` }}
//                   value={this.state.maxPrice}
//                   onChange={this.handleChange}
//                 />
//                 <Label
//                   style={{
//                     paddingTop: `.8em`,
//                     paddingLeft: `.3em`,
//                     backgroundColor: `transparent`,
//                   }}>
//                   .00
//                 </Label>
//               </Grid.Column>
//             </Grid.Row>

//             {/* Button Row */}
//             <Grid.Row>
//               <Button
//                 type="submit"
//                 style={{
//                   backgroundColor: `#b7b7b7`,
//                   margin: `0 auto`,
//                 }}>
//                 Submit
//               </Button>
//             </Grid.Row>
//           </Grid>
//         </form>
//       </div>
//     )
//   }
// }

// const mapState = state => ({
//   user: state.user,
//   isLoggedIn: state.user.googleId,
//   recommended: state.recommended,
// })

// const mapDispatch = {
//   fetchRecWines,
// }

// export default connect(mapState, mapDispatch)(SearchRow)
