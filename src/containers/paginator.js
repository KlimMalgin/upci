
import React from 'react';
import { Pagination, PageItem, PageLink, Container } from 'mdbreact';

class Paginator extends React.Component {
    constructor(props) {
        super();
        this.props = props;
    }

    handleChangePage(item) {
        this.props.changePage(item);
    }

    renderPageItem(item) {
        return (<PageItem key={item} active={item === this.props.active} onClick={this.handleChangePage.bind(this, item)}>
                <PageLink className="page-link">
                  {item + 1}
                </PageLink>
              </PageItem>);
    }

    changeIPP(e) {
        this.props.changeIPP(+e.target.value);
    }

    getPageRange() {
        let activePage = this.props.active;
        let pageCount = this.props.pageCount;
        let rangeSize = 5;
        let range = [];
        let halfRangeSize = Math.floor(rangeSize / 2);
        let startRange = activePage > rangeSize - halfRangeSize ? activePage - halfRangeSize : 0;
        let endRange = startRange + rangeSize;

        endRange = endRange < pageCount ? endRange : pageCount;

        for (let i = startRange; i < endRange; i++) {
            range.push(i);
        }

        return range;
    }

    render() {
        const paginatorClass = `paginator ${this.props.show === false ? 'hide' : ''}`;

        return (
          <Container className={paginatorClass}>
            <Pagination>
              <PageItem onClick={this.handleChangePage.bind(this, 0)} disabled={this.props.active === 0}>
                <PageLink className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </PageLink>
              </PageItem>

              {this.getPageRange.call(this).map(this.renderPageItem.bind(this))}

              <PageItem onClick={this.handleChangePage.bind(this, this.props.pageCount - 1)} disabled={this.props.active === this.props.pageCount - 1}>
                <PageLink className="page-link">
                  &raquo;
                </PageLink>
              </PageItem>
            </Pagination>

            <select className="mdb-select md-form" onChange={this.changeIPP.bind(this)}>
              <option value="10" disabled defaultValue>Choose items per page</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
          </select>
          </Container>
        );
    }
}

export default Paginator;
