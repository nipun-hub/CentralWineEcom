import { Button, Card } from 'antd'
import React, { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { useGetMembershipQuery } from '../../../features/api/membershipSlice.js'

const Plane = ({ changeStage }) => {
  const { theme } = useContext(ThemeContext)
  const { data, isLoading } = useGetMembershipQuery()
  console.log(data)
  return (
    <>
      <div className="flex flex-col mt-10">
        <div>
          <div className="flex items-center gap-5 mb-5">
            <img
              src="src/assets/images/planeImage.png"
              alt="plane image"
              width="84px"
              height="84px"
            />
            <span className="text-4xl font-extrabold">Free</span>
          </div>
          <p
            className="text-lg opacity-50 font-bold"
            style={{ color: theme.textColor }}
          >
            &#x2022; &nbsp;&nbsp;&nbsp;Every one Doller for one point
          </p>
          <p
            className="text-lg opacity-50 font-bold"
            style={{ color: theme.textColor }}
          >
            &#x2022; &nbsp;&nbsp;&nbsp;Every one Doller for one point Case (10
            Botteles) discount 10% off
          </p>
        </div>
        <div className="flex justify-around mt-10">
          {data?.map((item, index) => {
            return (
              <Card
                key={item._id}
                className="w-[263px] card-custom-shadow border-none"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-5 mb-5 justify-center">
                    {/*<img*/}
                    {/*  src="src/assets/images/planeImage.png"*/}
                    {/*  alt="plane image"*/}
                    {/*  width="84px"*/}
                    {/*  height="84px"*/}
                    {/*/>*/}
                    <span className="text-4xl font-bold">{item.name}</span>
                  </div>
                  <div className="flex flex-col items-center font-bold text-lg">
                    <span>${item.price}</span>
                    <span>{item.duration} </span>
                  </div>
                  <div className="text-lg text-black opacity-50 font-bold ">
                    {item.benefits.map((item, index) => {
                      return (
                        <p key={index}>&#x2022; &nbsp;&nbsp;&nbsp;{item}</p>
                      )
                    })}
                  </div>
                  <Button
                    className="bg-yellow-100 text-lg font-bold"
                    shape="round"
                    size="large"
                    onClick={() => changeStage(2)}
                  >
                    Become Member
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Plane
