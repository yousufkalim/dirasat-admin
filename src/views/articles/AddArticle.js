import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from 'utils/MyUploadAdapter';
import JoditEditor from './TextEditor';
import api from '../../api';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label
} from 'reactstrap';
// core components

const AddArticle = ({ openModal, handleModal, getArticles }) => {
  let [blog, setBlog] = useState({ is_featured: false });
  let [content, setContent] = useState('');

  const handleFileChange = (e) => {
    setBlog({ ...blog, blog_images: e.target.files[0] });
  };

  const handleFeatured = () => {
    setBlog({ ...blog, is_featured: !blog.is_featured });
  };

  const handleInput = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const property in blog) {
      formData.append(property, blog[property]);
    }
    formData.append('blog_content', content);

    // console.log("blog_content", content);
    api('post', '/blogs', formData)
      .then((res) => {
        toast.success('Article added successfully');
        getArticles();
        handleModal();
      })
      .catch(() => {
        toast.error('An error occurred');
      });
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="Y" toggle={handleModal}>
          Create Article
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="9" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-fname"
                        >
                          Title
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter tile here"
                          type="text"
                          value={blog.blog_title}
                          name="blog_title"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-lname"
                        >
                          Description
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          placeholder="Enter description here..."
                          type="textarea"
                          value={blog.blog_desc}
                          name="blog_desc"
                          rows="3"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-fname"
                        >
                          YouTube Embed Link
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter YouTube Embed Link here"
                          type="text"
                          value={blog.yt_link}
                          name="yt_link"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <div className="pl-lg-4"> */}
                  <Row>
                    <Col lg="9" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-image"
                        >
                          Featured image <i className="ni ni-album-2" />
                        </label>
                        <Input
                          className="form-control-file form"
                          id="input-image"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* </div> */}
                  <Row>
                    <Col lg="9" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-lname"
                        >
                          Article
                        </label>
                        <JoditEditor setValue={setContent} value={content} />
                        {/* <CKEditor
                          editor={ClassicEditor}
                          data={blog.blog_content}
                          onReady={(editor) => {
                            editor.plugins.get(
                              "FileRepository"
                            ).createUploadAdapter = (loader) => {
                              return new MyUploadAdapter(loader);
                            };
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setBlog((prev) => {
                              return {
                                ...prev,
                                blog_content: data,
                              };
                            });
                          }}
                        /> */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: 'auto' }}>
                      <FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="customCheck5"
                            type="checkbox"
                            value={blog.is_featured}
                            checked={blog.is_featured}
                            onChange={handleFeatured}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck5"
                          >
                            Featured
                          </label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddArticle;
