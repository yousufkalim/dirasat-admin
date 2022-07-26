/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from 'react';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';
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
  UncontrolledTooltip
} from 'reactstrap';
// core components
import AddArticle from './AddArticle';
import EditArticle from './EditArticle';
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';

const Articles = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [blog, setBlog] = useState({});
  const { articles } = Store();
  const updateStore = UpdateStore();

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const data = await api('get', '/blogs');

    if (data) {
      updateStore({ articles: data });
    }
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (article) => {
    setBlog(article || blog);
    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api('delete', `/blogs/${id}`)
      .then(() => {
        toast.success('Article deleted successfully');
        getArticles();
      })
      .catch(() => {
        toast.error('An error occurred while deleting');
      });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">Blog</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Ajouter un blog
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => {
                    return (
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="Article"
                                src={
                                  process.env.REACT_APP_SERVER_MEDIA_URL +
                                  article.blog_images
                                }
                              />
                            </a>
                            <Media>
                              <span
                                className="mb-0 text-sm"
                                title={article.blog_title}
                              >
                                {article.blog_title?.length > 30
                                  ? article.blog_title?.substring(0, 30) + '...'
                                  : article.blog_title}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td title={article.blog_desc}>
                          {article.blog_desc?.length > 30
                            ? article.blog_desc?.substring(0, 30) + '...'
                            : article.blog_desc}
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            {article.status}
                          </Badge>
                        </td>
                        <td>{new Date(article.createdAt).toDateString()}</td>
                        <td>{new Date(article.updatedAt).toDateString()}</td>

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
                                  window
                                    .open(
                                      `https://dirasat-international.com/blog/${article._id}`,
                                      '_blank'
                                    )
                                    .focus()
                                }
                              >
                                View
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => handleEditModal(article)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                className="text-danger"
                                onClick={() => handleDelete(article._id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddArticle
            openModal={openModal}
            handleModal={handleModal}
            getArticles={getArticles}
          />
        )}
        {editModal && (
          <EditArticle
            openModal={editModal}
            handleModal={handleEditModal}
            blog={blog}
            setBlog={setBlog}
            getArticles={getArticles}
          />
        )}
      </Container>
    </>
  );
};

export default Articles;
