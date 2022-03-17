import React from 'react';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom';


function Bangladeshi() {

    const [bangladeshi, setBangladeshi] = useState([]);

    useEffect(() => {
        getBangladeshi();

    }, []);

    const getBangladeshi = async () => {

        const check = localStorage.getItem('bangladeshi');
        

        if (check) {
            setBangladeshi(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags=indian&number=15`);

            const data = await api.json();

            localStorage.setItem("bangladeshi", JSON.stringify(data.recipes));
            setBangladeshi(data.recipes);
            console.log(data.recipes);

        };

    };




    return (
        <div>
            <Wrapper>
                <h3>Bangladeshi Cuisine</h3>

                <Splide options={{
                    perPage: 3,
                    drag: 'free',
                    gap: '1rem',
                    arrows: false,
                }}>

                    {bangladeshi.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                <Link to={'/recipe/' + recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            </Wrapper>

        </div>
    );
};

const Wrapper = styled.div`
    margin: 0.5rem 0rem;
`;

const Card = styled.div`
    min-height: 15rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        width: 100%;
        height: 100%;
        left: 0;
        position: absolute;
        object-fit: cover;
        filter: brightness(70%) saturate(150%);
    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 5%;
        color: white;
        transform: translate(-50%, 20%);
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
    `;


export default Bangladeshi;