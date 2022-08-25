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
import ExportResult from 'views/exportfiles/ExportResult.js';

// core components
import Header from 'components/Headers/Header.js';

const SingleUser = () => {
  const { id } = useParams();
  const updateStore = UpdateStore();
  const history = useHistory();
  const { singleUserResult } = Store();
  const [loading, setLoading] = useState(false);
  // Get All Results of a User
  useEffect(() => {
    getUserResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getUserResult = async () => {
    setLoading(true);
    let res = await api('get', `/admin/results/single-result/${id}`);
    if (res) {
      updateStore({ singleUserResult: res?.result });
      setLoading(false);
    }
  };

  const myHeader = ['Prénom', 'Nom', 'Date de naissance', 'email', 'phone'];
  console.log('get single user result', singleUserResult);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              {loading ? (
                <h1>chargement du résultat d'un seul utilisateur...</h1>
              ) : (
                <>
                  {singleUserResult?.dcourses?.length >= 1 ? (
                    <>
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Résultat</h3>
                        <ExportResult
                          id={singleUserResult?.user}
                          myHeader={myHeader}
                        />
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Establishment</th>
                            <th scope="col">Curriculum</th>
                            <th scope="col">Speciality</th>
                            <th scope="col">duration</th>
                            <th scope="col">cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleUserResult?.dcourses?.map((course) => {
                            return (
                              <tr>
                                <td title={1}>
                                  {/* {course.courseId.course_name} */}
                                  {course?.dcourseId?.Establishment.length > 60
                                    ? course?.dcourseId?.Establishment.substring(
                                        0,
                                        60
                                      ) + '...'
                                    : course.dcourseId?.Establishment +
                                      '\n' +
                                      course.dcourseId?.Speciality}
                                </td>

                                <td title={course.dcourseId?.Curriculum}>
                                  {course.dcourseId.Curriculum}
                                </td>

                                {/* <td title={course.dcourseId.Guardianship}>
                            {course.dcourseId.Guardianship}
                          </td> */}

                                <td title={course.dcourseId?.Speciality}>
                                  {course.dcourseId?.Speciality}
                                </td>

                                {/* <td title={course.dcourseId?.bacSerie}>
                            {course.dcourseId?.bacSerie}
                          </td> */}

                                <td title={course.dcourseId?.duration}>
                                  {course.dcourseId?.duration}
                                </td>

                                <td title={course.dcourseId.cost}>
                                  {course.dcourseId.cost}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </>
                  ) : (
                    <h1>Aucun cours disponible pour ce résultat</h1>
                  )}
                </>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SingleUser;
