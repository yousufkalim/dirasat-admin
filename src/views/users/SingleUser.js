import React, { useState, useEffect } from 'react';
import { Store, UpdateStore } from 'StoreContext';
import api from 'api';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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

const SingleUser = () => {
  const { id } = useParams();
  const updateStore = UpdateStore();
  const history = useHistory();
  const { singleUserResults } = Store();
  const [loading, setLoading] = useState(false);
  // Get All Results of a User
  useEffect(() => {
    getUserResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getUserResults = async () => {
    setLoading(true);
    let res = await api('get', `/admin/results/user-results/${id}`);
    if (res) {
      console.log('res', res);
      updateStore({ singleUserResults: res?.result });
      setLoading(false);
    }
  };
  console.log('singleUserResults are', singleUserResults);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              {loading ? (
                <h1>chargement d'un seul utilisateur</h1>
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Email</th>
                      <th scope="col">Domain</th>
                      <th scope="col">Type of Job</th>

                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {singleUserResults?.map((user) => {
                      return (
                        <tr>
                          <td title={user.user.email}>{user.user.email}</td>
                          <td title={user.domain}>{user.domain}}</td>
                          <td title={user.type_of_job}>{user.type_of_job}</td>

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
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  onClick={() =>
                                    history.push(`/admin/result/${user._id}`)
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
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SingleUser;
