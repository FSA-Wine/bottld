import { useRouter } from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleWine } from "../../store/singleWine";

const SingleWine = props => {
  const router = useRouter();

  return <SingleWineWithoutRouter {...props} router={router} />;
};

class SingleWineWithoutRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loc: props.router.query.loc,
      loaded: false
    };
    this.trimParen = this.trimParen.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleWine(this.props.router.query.id);
  }

  trimParen(title) {
    if (title.lastIndexOf('(') !== -1) {
      let sParenIdx = title.lastIndexOf('(')
      return title.slice(0, sParenIdx)
    }
  }

  render() {
    const singleWine = this.props.singleWine;
    if (singleWine.length) {
      let curWine = singleWine[0]._fields[0].properties;
      return (
        <div>
          <h1>{this.trimParen(curWine.title)}</h1>
          <p>Winery: {curWine.winery}</p>
          <p>Varietal: {curWine.variety}</p>
          <p>Origin: {curWine.province}, {curWine.country}</p>
          <p>Est. price: ${curWine.price}</p>
          <p>Score: {curWine.points.low}</p>
          <p style={{ fontStyle: "italic" }}>{curWine.description}</p>
        </div>
      );
    } else {
      return <div> Nothing Found</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    singleWine: state.singleWine
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleWine: id => dispatch(fetchSingleWine(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleWine);

// export default () => {
//   const router = useRouter()

//   return (
//     <>
//       <h1>Wine #{router.query.id}</h1>
//     </>
//   )
// }
