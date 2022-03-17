import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';



function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions")

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);


  return (
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt="" />
        </div>
        <Info>
            <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instructions</Button> 
            <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>      

            {activeTab === "instructions" && (

                <div>
                <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
            </div>
            )}
            
            {activeTab === "ingredients" && (
                 <ul>
                {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
                ))}
                </ul>

            )}
            
            

        </Info>

  </DetailWrapper>
    
  );
  
}

const DetailWrapper = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: flex;

    .active {
       background-color: #990000;
       background-image: linear-gradient(147deg, #990000 0%, #ff0000 74%);

       color: white;
    }
    h2 {
        margin-bottom: 1rem;
        font-size: 30px;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
        margin-left: 2rem;
    }
    ul {
        margin-top: 2rem;
    }

    img {
        width: 400px;
        filter: brightness(80%) saturate(150%);
    }

`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid #990000;
    margin-right: 2rem;
    font-weight: 600;
    margin-top: 3rem;
    cursor: pointer;
`;

const Info = styled.div`
    margin-left: 5rem;
    text-align: justify;
   
  
`;

export default Recipe