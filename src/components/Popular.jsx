import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom';




function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {

        const check = localStorage.getItem('popular');

        if(check) {
            setPopular(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=American&number=15`);

            const data = await api.json();

            localStorage.setItem("popular", JSON.stringify(data.recipes));
            setPopular(data.recipes);
            console.log(data.recipes);  

        };
            
    };


    return (
        <div>
                    <Wrapper>
                        <h3>Trending</h3>

                        <Splide options={{
                            perPage: 5,
                            drag: 'free',
                            gap: '1rem',
                            arrows: false,
                        }}>

                        {popular.map((recipe) => {
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
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        width: 100%;
        height: 50%;
        position: absolute;
        object-fit: cover;
        left: 0;
        filter: brightness(60%) saturate(150%);
    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 40%;
        color: white;
        transform: translate(-50%, 0%);
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
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 2, 2));
    `;

export default Popular