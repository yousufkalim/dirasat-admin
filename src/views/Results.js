import React, { useState, useEffect, useRef } from 'react';
import { Store, UpdateStore } from 'StoreContext';
import api from 'api';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import {
  Badge,
  Card,
  CardHeader,
  Button,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip
} from 'reactstrap';

// core components
import Header from 'components/Headers/Header.js';
const Results = () => {
  const updateStore = UpdateStore();
  const history = useHistory();
  const pagination = useRef();
  const { results } = Store();
  const [page, setPage] = React.useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  // Get dashboard data from API
  useEffect(() => {
    getAllResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  let getAllResults = async () => {
    setLoading(true);
    let res = await api(
      'get',
      `/admin/results/get-results?pageNumber=${page}&pageSize=${20}`
    );
    console.log('resis', results);
    if (res) {
      updateStore({ results: res?.results });
      setCount(res?.totalResults);
      setLoading(false);
    }
  };
  {
    console.log('page is ', page);
  }
  {
    console.log('total page is ', Math.ceil(count / 50));
  }
  const setPageresult = ({ selected }) => {
    console.log(selected === 0 ? 1 : selected);
    console.log('selected result', selected);
    setPage(selected);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">Résultat</h3>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Domaine</th>
                    <th scope="col">type d'emplois</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {results?.map((result) => {
                    return (
                      <tr>
                        <td title={result.user.email}>{result.user.email}</td>
                        <td title={result.domain}>{result.domain}</td>
                        <td title={result.type_of_job}>{result.type_of_job}</td>

                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={() =>
                                  history.push(`/admin/result/${result._id}`)
                                }
                              >
                                Voir résultat
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination     ///////////// */}
              <CardFooter className="py-4">
                <nav aria-label="...">
                  {/* <ReactPaginate
                    ref={pagination}
                    pageCount={Math.ceil(count / 20)}
                    // pageRangeDisplayed={4}
                    // marginPagesDisplayed={1}
                    onPageChange={setPageresult}
                    containerClassName="pagination"
                    activeClassName="active"
                    pageLinkClassName="page-link"
                    breakLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    pageClassName="page-item"
                    breakClassName="page-item"
                    nextClassName="page-item"
                    previousClassName="page-item"
                    previousLabel={<>&laquo;</>}
                    nextLabel={<>&raquo;</>}
                  /> */}
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${page == 0 && 'active'}`}>
                      <PaginationLink onClick={(e) => setPage(0)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${page == 1 && 'active'}`}>
                      <PaginationLink onClick={(e) => setPage(1)}>
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${page == 2 && 'active'}`}>
                      <PaginationLink onClick={(e) => setPage(2)}>
                        3
                      </PaginationLink>
                    </PaginationItem>
                    {page > 2 && (
                      <PaginationItem className={`${page > 2 && 'active'}`}>
                        <PaginationLink onClick={(e) => setPage(2)}>
                          {page + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem className={`${page > 2 && 'active'}`}>
                      <PaginationLink
                        onClick={(e) => setPage((prev) => prev + 1)}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Results;
