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
      console.log('singleUserResult', res);
      updateStore({ singleUserResult: res?.result });
      setLoading(false);
    }
  };
  console.log('singleResults', singleUserResult);
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
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">courseName</th>
                      <th scope="col">percentage</th>
                      <th scope="col">selectivity</th>
                      <th scope="col">cost</th>
                      <th scope="col">language</th>
                      <th scope="col">duration</th>
                      <th scope="col">distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {singleUserResult?.courses.map((course) => {
                      return (
                        <tr>
                          <td title={1}>
                            {/* {course.courseId.course_name} */}
                            {course.courseId?.course_name.length > 60
                              ? course.courseId?.course_name.substring(0, 60) +
                                '...'
                              : course.courseId?.course_name}
                          </td>

                          <td title={course.percentage}>{course.percentage}</td>

                          <td title={course.selectivityrating}>
                            {course.selectivityrating.substring(0, 1)}
                          </td>

                          <td title={course.courseId?.cost}>
                            {course.courseId?.cost.substring(0, 1)}
                          </td>

                          <td title={course.courseId?.languagestar}>
                            {course.courseId?.languagestar.substring(0, 1)}
                          </td>

                          <td title={course.courseId?.duration}>
                            {course.courseId?.duration.substring(0, 1)}
                          </td>

                          <td title={course.distancerating}>
                            {course.distancerating}
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
