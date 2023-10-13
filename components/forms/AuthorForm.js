import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createAuthor, updateAuthor } from '../../api/authorData';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  image: '',
  first_name: '',
  last_name: '',
  favorite: '',
  email: '',
};

function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateAuthor(patchPayload).then(() => {
          router.push('/authors');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Author First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author's First Name"
            name="first_name"
            value={formInput.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Author Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author's Last Name"
            name="last_name"
            value={formInput.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter Author's Image"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Author Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author's Email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* <Form.Select
          name="author_id"
          onChange={handleChange}
          value={obj.author_id}
          required
        >
          <option value="">Select An Author</option>

          {
          authors.map((author) => (
            <option
              key={author.firebaseKey}
              value={author.firebaseKey}
            >
              {author.first_name} {author.last_name}
            </option>
          ))
        }

        </Form.Select> */}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="switch"
            label="Favorite?"
            name="favorite"
            checked={formInput.favorite}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                favorite: e.target.checked,
              }));
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Author' : 'Submit Author'}
        </Button>
      </Form>
    </>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    favorite: PropTypes.bool,
    email: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: intialState,
};

export default AuthorForm;
