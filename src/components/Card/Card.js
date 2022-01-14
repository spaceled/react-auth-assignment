import React from 'react';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './Card.css'

const CardInfo = ({ id, name, image }) => {
    return (
        <div>
        <Link to={`/destination/${name}`} className="card_text">
            <Card  className="card">
                <Card.Img variant="top" src={image} style={{ height: '60%', width: '60%', marginLeft: '20%',padding: '20px'}} />
                <Card.Body>
                    <Card.Title className="text-primary"  >{name}</Card.Title>
                </Card.Body>
            </Card>
            </Link>
        </div>

    );
};

export default CardInfo;