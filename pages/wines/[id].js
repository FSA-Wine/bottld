import { useRouter } from "next/router";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { fetchSingleWine } from "../../store/singleWine";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Flag, Segment } from "semantic-ui-react";

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
    this.trimParen = this.trimParen.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleWine(this.props.router.query.id);
  }

  trimParen(title) {
    if (title.lastIndexOf("(") !== -1) {
      let sParenIdx = title.lastIndexOf("(");
      return title.slice(0, sParenIdx);
    }
  }

  render() {
    const singleWine = this.props.singleWine;
    if (singleWine.length) {
      let curWine = singleWine[0]._fields[0].properties;
      return (
        <Fragment>
          <div>
            <h1>{this.trimParen(curWine.title)}</h1>
            <p>Winery: {curWine.winery}</p>
            <p>Varietal: {curWine.variety}</p>
            <Flag name="france" />
            <p>
              Origin: {curWine.province}, {curWine.country}
            </p>
            <p>Est. price: ${curWine.price}</p>
            <p>Score: {curWine.points.low}</p>
            <p style={{ fontStyle: "italic" }}>{curWine.description}</p>
          </div>

          <Card.Group className="card-group">
            {singleWine.map(el => {
              let currentWine = el._fields[1].properties;
              let wineId = el._fields[1].identity.low;
              return (
                <Card key={wineId} style={{ maxWidth: `120px` }}>
                  <Card.Content>
                    <Card.Header>
                      <Link href={`/wines/${wineId}`}>
                        {this.trimParen(currentWine.title)}
                      </Link>
                    </Card.Header>
                    <Card.Meta>Subhead</Card.Meta>
                    <Card.Description>
                      {currentWine.description.slice(0, 50)}
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </Fragment>
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
