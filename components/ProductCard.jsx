import React from "react";
import styled from "styled-components";
import { FaInfoCircle, FaLightbulb, FaSun } from "react-icons/fa";

export const ProductCard = ({ data }) => {
  const featuresData = [
    data.view_benefit,
    data.view_bonus,
    data.view_contract,
    data.view_exit_fee
  ];

  console.log(data.dmo_content.Ausgrid)

  return (
    <CardContainer>
      <BarContainer>
        <FaLightbulb />
        <span>Electricity</span>
      </BarContainer>
      <SolarBar>
        <FaSun />
        <span>Sun</span>
      </SolarBar>
      <HeaderContainer>
        <ImgContainer>
          <Image src={data.provider_image} />
          <ImgContainerText>View Details</ImgContainerText>
          <ImgContainerText>Basic Plan Information Document</ImgContainerText>
        </ImgContainer>
        <HeaderDeatils>
          <HighLightBox>
            <span>{data.dmo_percentage.Ausgrid}</span> <br />
            <span>{data.plan_name_below_data}</span>
          </HighLightBox>
          <FeaturesContainer>
            {featuresData.map((item, index) => (
              <FeatureBox key={index}>
                ✔{" "}
                <FeatureText
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: item
                  }}
                />
              </FeatureBox>
            ))}
          </FeaturesContainer>
          <StandardFeedBox>Standard Feed in Tarrif: 5c</StandardFeedBox>
        </HeaderDeatils>
        <EstimatedCost>
          <EstimatedCostHeader>
            Estimated Cost <FaInfoCircle />
          </EstimatedCostHeader>
          <EstimatedCostDetails>
            <ExpectedYearly>
              ${data.expected_annually_bill_amount}
              <sup>^</sup>
              <Sub>/yr</Sub>
            </ExpectedYearly>

            <ExpectedMonthly>
              ${data.expected_monthly_bill_amount}
              <Sub>/mo</Sub>
            </ExpectedMonthly>
          </EstimatedCostDetails>
        </EstimatedCost>
      </HeaderContainer>
      <DetailsConatiner>
        <div
          dangerouslySetInnerHTML={{
            __html: data.dmo_content.Ausgrid
          }}
        />
      </DetailsConatiner>
      <FooterConatiner>
        <div style={{ width: "80%" }}>
          <FeatureText>✔ 10 business days cooling off period</FeatureText>
          <FeatureText>✔ Secure signup in 5 minutes</FeatureText>
          <FeatureText>✔ Save time and effort</FeatureText>
          <div style={{ marginTop: "8px" }}>
            ^The estimated includes any applicable welcome credits, bonuses, and
            conditional discounts (if applicable) which apply within the first
            12 months of the plan
          </div>
        </div>
        <FooterBtn>Connect Online Today</FooterBtn>
      </FooterConatiner>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  margin: 50px auto;
  border: 1px solid gray;
  border-radius: 10px;
  position: relative;
  max-width: 1200px;
`;

const BarContainer = styled.div`
  position: absolute;
  top: -15px;
  left: 50px;
  background: #f5f5f5;
  padding: 7px;
  display: flex;
  justify-content: center;
  gap: 10px;
  border-radius: 10px;
`;
const SolarBar = styled(BarContainer)`
  left: 200px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
  padding: 15px 15px 10px;
  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Image = styled.img`
  max-width: 150px;
`;

const ImgContainerText = styled.div`
  font-size: 15px;
  color: #0186f7;
  margin-bottom: 5px;
`;

const HighLightBox = styled.div`
  background: #f5f5f5;
  padding: 5px;
  border-radius: 5px;
  padding: 10px;
  width: 45%;
`;

const FeaturesContainer = styled.div`
  max-width: 350px;
  margin: 10px auto;
  text-align: center;
`;

const FeatureBox = styled.span`
  margin-left: 15px;
`;

const FeatureText = styled.section`
  display: inline-block;
  p {
    margin: 0;
    padding: 0;
  }
`;

const HeaderDeatils = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StandardFeedBox = styled.div`
  background: #deeff1;
  padding: 3px;
  margin: 5px;
`;

const EstimatedCost = styled.div`
  width: 220px;
`;

const EstimatedCostHeader = styled.div`
  background: #2f5ea1;
  padding: 7px;
  color: white;
`;

const EstimatedCostDetails = styled.div`
  background: #cfe7ea;
  padding: 10px;
`;

const ExpectedYearly = styled.div`
  color: #20327a;
  font-size: 25px;
  font-weight: 700;
`;

const ExpectedMonthly = styled.div`
  color: #0000f7;
  font-size: 20px;
  font-weight: 500;
`;

const Sub = styled.sub`
  color: #4a4b4d;
  font-size: 15px;
`;

const DetailsConatiner = styled.p`
  color: #4a4b4d;
  padding: 0 15px 10px;
`;
const FooterConatiner = styled.div`
  background: #f5f5f5;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
`;

const FooterBtn = styled.button`
  background-color: #1a2b75;
  color: #fff;
  padding: 15px;
  border-radius: 30px;
  width: "10%";
  height: 10%;
`;
