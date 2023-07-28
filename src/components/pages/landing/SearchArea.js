import React from 'react';
import { Container, InputGroup, Form, Button } from "react-bootstrap"
import { FiSearch } from "react-icons/fi"
const SearchArea = () => {
    return (
        <>
            <section className='product_search_wrap'>
                <Container>
                    <div className='product_search'>
                        <InputGroup>
                            <Form.Control
                                placeholder="Search..."
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                className='input_field'
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                                <FiSearch />
                            </Button>
                        </InputGroup>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default SearchArea